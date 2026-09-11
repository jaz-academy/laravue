<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\MediaBlog;
use App\Models\MediaBlogComment;
use App\Services\MediaFormatter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class BlogMediaController extends Controller
{
    protected function resolveBlog($idOrSlug)
    {
        return MediaBlog::with(['user', 'userLikes', 'comments.user'])
            ->where('id', is_numeric($idOrSlug) ? (int)$idOrSlug : 0)
            ->orWhere('mongodb_id', $idOrSlug)
            ->orWhere('slug', $idOrSlug)
            ->orWhere('title', $idOrSlug)
            ->first();
    }

    /**
     * Get published blogs
     */
    public function index(Request $request)
    {
        try {
            $category = $request->query('category');
            $queryStr = $request->query('query');
            $limit = (int) $request->query('limit', 0);

            $currentUserId = Auth::guard('sanctum')->id();

            $query = MediaBlog::with(['user', 'userLikes'])
                ->where('status', 'PUBLISHED')
                ->orderByDesc('created_at');

            if ($category && $category !== 'All') {
                $query->where('category', $category);
            }

            if ($queryStr && trim($queryStr) !== '') {
                $query->where(function ($q) use ($queryStr) {
                    $q->where('title', 'like', "%{$queryStr}%")
                      ->orWhere('excerpt', 'like', "%{$queryStr}%")
                      ->orWhere('category', 'like', "%{$queryStr}%");
                });
            }

            if ($limit > 0) {
                $query->limit($limit);
            }

            $blogs = $query->get();

            $data = $blogs->map(function ($b) use ($currentUserId) {
                return MediaFormatter::formatBlog($b, $currentUserId);
            });

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'data' => []], 500);
        }
    }

    /**
     * Get distinct blog categories
     */
    public function categories()
    {
        try {
            $categories = MediaBlog::where('status', 'PUBLISHED')
                ->distinct()
                ->pluck('category')
                ->filter()
                ->values()
                ->all();

            return response()->json([
                'success' => true,
                'data' => $categories,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'data' => []], 500);
        }
    }

    /**
     * Get single blog by ID or slug
     */
    public function show($idOrSlug)
    {
        try {
            $blog = $this->resolveBlog($idOrSlug);
            if (!$blog) {
                return response()->json(['success' => false, 'error' => 'Artikel blog tidak ditemukan.'], 404);
            }

            $currentUserId = Auth::guard('sanctum')->id();

            return response()->json([
                'success' => true,
                'data' => MediaFormatter::formatBlog($blog, $currentUserId),
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => 'Gagal mengambil data artikel: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Create blog post
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Silakan login terlebih dahulu untuk menulis artikel.'], 401);
        }

        if ($user->media_role === 'guest') {
            return response()->json(['success' => false, 'error' => 'Tamu (guest) tidak memiliki izin untuk membuat artikel blog.'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        try {
            $title = $request->title;
            $content = $request->content;
            $cleanContent = trim(strip_tags($content));
            $excerpt = $request->input('excerpt') ?: (Str::limit($cleanContent, 120, '...'));
            $image = $request->input('image') ?: '/no-photo.png';
            $category = $request->input('category') ?: 'Creative';
            $readTime = $request->input('readTime') ?: '3 min read';

            $baseSlug = Str::slug($title) ?: 'blog-post';
            $uniqueSlug = $baseSlug . '-' . Str::random(5);

            $dateFormatted = now()->locale('id')->isoFormat('D MMMM Y');

            $blog = MediaBlog::create([
                'title' => $title,
                'slug' => $uniqueSlug,
                'excerpt' => $excerpt,
                'content' => $content,
                'image' => $image,
                'category' => $category,
                'date' => $dateFormatted,
                'read_time' => $readTime,
                'likes' => 1,
                'rating' => 5.0,
                'reviews_count' => 1,
                'user_id' => $user->id,
                'author_name' => $user->name,
                'author_avatar' => $user->image ?: '',
                'status' => 'PUBLISHED',
            ]);

            return response()->json([
                'success' => true,
                'data' => MediaFormatter::formatBlog($blog, $user->id),
            ], 201);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update blog
     */
    public function update($id, Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Anda belum login.'], 401);
        }

        $blog = $this->resolveBlog($id);
        if (!$blog) {
            return response()->json(['success' => false, 'error' => 'Blog tidak ditemukan.'], 404);
        }

        $isAdmin = $user->media_role === 'admin' || $user->role >= 4;
        if ($blog->user_id !== $user->id && !$isAdmin) {
            return response()->json(['success' => false, 'error' => 'Hanya penulis atau admin yang dapat mengedit artikel ini.'], 403);
        }

        try {
            if ($request->has('title')) $blog->title = $request->title;
            if ($request->has('category')) $blog->category = $request->category;
            if ($request->has('content')) {
                $blog->content = $request->content;
                $cleanContent = trim(strip_tags($request->content));
                if (!$request->has('excerpt')) {
                    $blog->excerpt = Str::limit($cleanContent, 120, '...');
                }
            }
            if ($request->has('excerpt')) $blog->excerpt = $request->excerpt;
            if ($request->has('image')) $blog->image = $request->image;
            if ($request->has('readTime')) $blog->read_time = $request->readTime;

            $blog->save();

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete blog
     */
    public function destroy($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Anda belum login.'], 401);
        }

        $blog = $this->resolveBlog($id);
        if (!$blog) {
            return response()->json(['success' => false, 'error' => 'Blog tidak ditemukan.'], 404);
        }

        $isAdmin = $user->media_role === 'admin' || $user->role >= 4;
        if ($blog->user_id !== $user->id && !$isAdmin) {
            return response()->json(['success' => false, 'error' => 'Hanya penulis atau admin yang dapat menghapus artikel ini.'], 403);
        }

        try {
            $blog->comments()->delete();
            $blog->userLikes()->detach();
            $blog->delete();

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Toggle like on blog
     */
    public function toggleLike($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Silakan login untuk menyukai artikel.'], 401);
        }

        $blog = $this->resolveBlog($id);
        if (!$blog) {
            return response()->json(['success' => false, 'error' => 'Blog tidak ditemukan.'], 404);
        }

        try {
            $isLiked = $blog->userLikes()->where('user_id', $user->id)->exists();
            if ($isLiked) {
                $blog->userLikes()->detach($user->id);
                $blog->likes = max(0, $blog->likes - 1);
                $newIsLiked = false;
            } else {
                $blog->userLikes()->attach($user->id);
                $blog->likes += 1;
                $newIsLiked = true;
            }

            $blog->save();

            return response()->json([
                'success' => true,
                'likes' => (int) $blog->likes,
                'isLiked' => $newIsLiked,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => 'Gagal menyukai artikel: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get blog comments
     */
    public function getComments($id)
    {
        $blog = $this->resolveBlog($id);
        if (!$blog) {
            return response()->json(['success' => false, 'error' => 'Blog tidak ditemukan.'], 404);
        }

        try {
            $comments = MediaBlogComment::with('user')
                ->where('media_blog_id', $blog->id)
                ->orderByDesc('created_at')
                ->get();

            $data = $comments->map(function ($c) {
                return [
                    'id' => (string) ($c->mongodb_id ?: $c->id),
                    'content' => $c->content,
                    'createdAt' => $c->created_at?->toISOString(),
                    'author' => [
                        'name' => $c->user?->name ?: 'Anonim',
                        'image' => $c->user?->image ?: '',
                    ],
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => 'Gagal mengambil komentar.'], 500);
        }
    }

    /**
     * Add comment to blog
     */
    public function addComment($id, Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Silakan login untuk menambahkan komentar.'], 401);
        }

        $request->validate(['content' => 'required|string']);

        $blog = $this->resolveBlog($id);
        if (!$blog) {
            return response()->json(['success' => false, 'error' => 'Blog tidak ditemukan.'], 404);
        }

        try {
            $comment = MediaBlogComment::create([
                'media_blog_id' => $blog->id,
                'user_id' => $user->id,
                'content' => trim($request->content),
            ]);

            $blog->increment('reviews_count');

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => (string) $comment->id,
                    'content' => $comment->content,
                    'createdAt' => $comment->created_at?->toISOString(),
                    'author' => [
                        'name' => $user->name,
                        'image' => $user->image ?: '',
                    ],
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => 'Gagal menambahkan komentar.'], 500);
        }
    }
}
