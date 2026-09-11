<?php

namespace App\Services;

use Carbon\Carbon;

class MediaFormatter
{
    public static function timeAgo($date): string
    {
        if (!$date) return 'baru saja';
        $carbon = $date instanceof Carbon ? $date : Carbon::parse($date);
        $diffInSeconds = max(0, abs(now()->diffInSeconds($carbon)));

        if ($diffInSeconds < 60) return "{$diffInSeconds} detik yang lalu";
        $diffInMinutes = floor($diffInSeconds / 60);
        if ($diffInMinutes < 60) return "{$diffInMinutes} menit yang lalu";
        $diffInHours = floor($diffInMinutes / 60);
        if ($diffInHours < 24) return "{$diffInHours} jam yang lalu";
        $diffInDays = floor($diffInHours / 24);
        if ($diffInDays < 30) return "{$diffInDays} hari yang lalu";
        $diffInMonths = floor($diffInDays / 30);
        if ($diffInMonths < 12) return "{$diffInMonths} bulan yang lalu";
        $diffInYears = floor($diffInDays / 365);
        return "{$diffInYears} tahun yang lalu";
    }

    public static function formatUser($user): ?array
    {
        if (!$user) return null;

        $role = $user->media_role;
        if (!$role) {
            $role = $user->role >= 4 ? 'admin' : ($user->role >= 2 ? 'mentor' : 'member');
        }

        return [
            'id' => (string) $user->id,
            '_id' => (string) ($user->mongodb_id ?: $user->id),
            'name' => $user->name,
            'username' => $user->username ?: '',
            'email' => $user->email,
            'image' => $user->image,
            'bio' => $user->bio ?: '',
            'skills' => is_array($user->skills) ? $user->skills : [],
            'role' => $role,
            'instagramId' => $user->instagram_id,
        ];
    }

    public static function formatTask($task, $currentUserId = null): array
    {
        $author = $task->user;
        $authorFormatted = [
            'id' => $author ? (string) $author->id : '',
            '_id' => $author ? (string) ($author->mongodb_id ?: $author->id) : '',
            'name' => $author ? $author->name : 'Member',
            'username' => $author ? ($author->username ?: '') : '',
            'image' => $author && $author->image ? $author->image : '/no-photo.png',
            'email' => $author ? $author->email : '',
        ];

        $collaborators = $task->collaborators->map(function ($c) {
            return [
                'id' => (string) $c->id,
                '_id' => (string) ($c->mongodb_id ?: $c->id),
                'name' => $c->name,
                'username' => $c->username ?: '',
                'image' => $c->image ?: '/no-photo.png',
            ];
        })->values()->all();

        $project = $task->project;
        $projectFormatted = $project ? [
            'id' => (string) ($project->mongodb_id ?: $project->id),
            'title' => $project->title,
            'managerId' => $project->project_manager_id ? (string) $project->project_manager_id : null,
        ] : null;

        $likes = $task->likes->map(function ($u) {
            return [
                'id' => (string) $u->id,
                '_id' => (string) ($u->mongodb_id ?: $u->id),
                'name' => $u->name,
                'username' => $u->username ?: '',
                'image' => $u->image ?: '/no-photo.png',
                'email' => $u->email,
            ];
        })->values()->all();

        $isLikedByMe = false;
        if ($currentUserId) {
            $isLikedByMe = $task->likes->contains(function ($u) use ($currentUserId) {
                return (string) $u->id === (string) $currentUserId || (string) $u->mongodb_id === (string) $currentUserId;
            });
        }

        $comments = $task->comments->map(function ($c) {
            $cAuthor = $c->user;
            return [
                'id' => (string) $c->id,
                '_id' => (string) ($c->mongodb_id ?: $c->id),
                'content' => $c->content,
                'authorId' => [
                    'id' => $cAuthor ? (string) $cAuthor->id : '',
                    '_id' => $cAuthor ? (string) ($cAuthor->mongodb_id ?: $cAuthor->id) : '',
                    'name' => $cAuthor ? $cAuthor->name : 'Anonim',
                    'username' => $cAuthor ? ($cAuthor->username ?: '') : '',
                    'image' => $cAuthor && $cAuthor->image ? $cAuthor->image : '/no-photo.png',
                    'email' => $cAuthor ? $cAuthor->email : '',
                ],
                'createdAt' => $c->created_at ? $c->created_at->toISOString() : null,
            ];
        })->values()->all();

        $mediaUrls = $task->media_urls ?: ($task->media_url ? [$task->media_url] : []);

        $review = null;
        if ($task->grade !== null || $task->review_comment) {
            $review = [
                'grade' => $task->grade !== null ? (float) $task->grade : null,
                'comment' => $task->review_comment,
                'mentorName' => $task->mentor ? $task->mentor->name : 'Mentor',
                'mentorId' => $task->mentor_id ? (string) $task->mentor_id : null,
                'reviewedAt' => $task->reviewed_at ? $task->reviewed_at->toISOString() : null,
            ];
        }

        return [
            'id' => (string) $task->id,
            '_id' => (string) ($task->mongodb_id ?: $task->id),
            'author' => [
                'id' => $authorFormatted['id'],
                'name' => $authorFormatted['name'],
                'image' => $authorFormatted['image'],
            ],
            'authorId' => $authorFormatted,
            'collaborators' => $collaborators,
            'projectTitle' => $project ? $project->title : 'Project',
            'project' => $projectFormatted,
            'mediaUrl' => $task->media_url,
            'mediaUrls' => $mediaUrls,
            'mediaType' => $task->media_type ?: 'image',
            'caption' => $task->caption,
            'timeAgo' => self::timeAgo($task->created_at),
            'review' => $review,
            'likes' => $likes,
            'likesCount' => count($likes),
            'isLikedByMe' => $isLikedByMe,
            'comments' => $comments,
            'commentsCount' => count($comments),
            'status' => $task->status ?: 'pending',
            'createdAt' => $task->created_at ? $task->created_at->toISOString() : null,
            'updatedAt' => $task->updated_at ? $task->updated_at->toISOString() : null,
        ];
    }

    public static function formatBlog($blog, $currentUserId = null): array
    {
        $author = $blog->user;
        $resolvedAuthorName = $blog->author_name ?: ($author ? $author->name : 'Tim Jazmedia');
        $resolvedAuthorAvatar = $blog->author_avatar ?: ($author ? $author->image : '');
        $resolvedAuthorId = $blog->user_id ? (string) $blog->user_id : null;

        $likedBy = $blog->userLikes->map(function ($u) {
            return (string) $u->id;
        })->all();

        $isLikedByMe = false;
        if ($currentUserId) {
            $isLikedByMe = in_array((string) $currentUserId, $likedBy);
        }

        return [
            'id' => (string) $blog->id,
            '_id' => (string) ($blog->mongodb_id ?: $blog->id),
            'title' => $blog->title ?: '',
            'slug' => $blog->slug ?: '',
            'excerpt' => $blog->excerpt ?: '',
            'content' => $blog->content ?: '',
            'image' => $blog->image ?: '',
            'category' => $blog->category ?: 'General',
            'date' => $blog->date ?: '',
            'readTime' => $blog->read_time ?: '3 min read',
            'likes' => (int) ($blog->likes ?: 0),
            'rating' => (float) ($blog->rating ?: 4.9),
            'reviewsCount' => (int) ($blog->reviews_count ?: 0),
            'authorId' => $resolvedAuthorId,
            'authorName' => $resolvedAuthorName,
            'authorAvatar' => $resolvedAuthorAvatar,
            'status' => $blog->status ?: 'PUBLISHED',
            'likedBy' => $likedBy,
            'isLikedByMe' => $isLikedByMe,
            'createdAt' => $blog->created_at ? $blog->created_at->toISOString() : null,
        ];
    }

    public static function formatProject($project, $tasksByProject = []): array
    {
        $pid = (string) ($project->mongodb_id ?: $project->id);

        return [
            'id' => $pid,
            '_id' => $pid,
            'numeric_id' => $project->id,
            'title' => $project->title,
            'description' => $project->description,
            'status' => $project->status ?: 'active',
            'mentorId' => $project->mentor_id ? (string) $project->mentor_id : '',
            'mentorName' => $project->mentor ? $project->mentor->name : 'Tanpa Mentor',
            'projectManagerId' => $project->project_manager_id ? (string) $project->project_manager_id : '',
            'projectManagerName' => $project->projectManager ? $project->projectManager->name : 'Belum ada PM',
            'creatorId' => $project->creator_id ? (string) $project->creator_id : '',
            'participantsCount' => $project->participants()->count(),
            'tasks' => $tasksByProject[$project->id] ?? [],
            'createdAt' => $project->created_at ? $project->created_at->toISOString() : null,
        ];
    }
}
