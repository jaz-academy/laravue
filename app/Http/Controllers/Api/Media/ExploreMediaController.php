<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\MediaProject;
use App\Models\MediaTask;
use App\Models\User;
use App\Services\MediaFormatter;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExploreMediaController extends Controller
{
    /**
     * Search tasks by query
     */
    public function searchTasks(Request $request)
    {
        $query = $request->query('q', '');
        if (!$query) {
            return response()->json([]);
        }

        try {
            $currentUserId = Auth::guard('sanctum')->id();

            $tasks = MediaTask::with(['user', 'mentor', 'collaborators', 'project', 'likes', 'comments.user'])
                ->where(function ($q) use ($query) {
                    $q->where('caption', 'like', "%{$query}%")
                      ->orWhere('media_type', 'like', "%{$query}%")
                      ->orWhereHas('user', function ($uq) use ($query) {
                          $uq->where('name', 'like', "%{$query}%")
                             ->orWhere('username', 'like', "%{$query}%");
                      })
                      ->orWhereHas('project', function ($pq) use ($query) {
                          $pq->where('title', 'like', "%{$query}%");
                      });
                })
                ->limit(30)
                ->get();

            $formatted = $tasks->map(function ($task) use ($currentUserId) {
                return MediaFormatter::formatTask($task, $currentUserId);
            });

            return response()->json($formatted);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Search users by query
     */
    public function searchUsers(Request $request)
    {
        $query = $request->query('q', '');
        if (!$query) {
            return response()->json([]);
        }

        try {
            $users = User::where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('username', 'like', "%{$query}%")
                  ->orWhere('bio', 'like', "%{$query}%");
            })
            ->limit(15)
            ->get();

            $data = $users->map(function ($u) {
                return [
                    'id' => (string) $u->id,
                    '_id' => (string) ($u->mongodb_id ?: $u->id),
                    'name' => $u->name,
                    'username' => $u->username ?: '',
                    'image' => $u->image ?: '/no-photo.png',
                    'role' => $u->media_role ?: 'member',
                    'bio' => $u->bio ?: '',
                ];
            });

            return response()->json($data);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Search projects by query
     */
    public function searchProjects(Request $request)
    {
        $query = $request->query('q', '');
        if (!$query) {
            return response()->json([]);
        }

        try {
            $projects = MediaProject::where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%");
            })
            ->limit(15)
            ->get();

            $data = $projects->map(function ($p) {
                return [
                    'id' => (string) ($p->mongodb_id ?: $p->id),
                    'numeric_id' => $p->id,
                    'title' => $p->title,
                    'description' => $p->description,
                    'status' => $p->status,
                ];
            });

            return response()->json($data);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Member streaks calculation
     */
    public function getStreaks(Request $request)
    {
        $query = $request->query('q', '');

        try {
            $membersQuery = User::where(function ($q) {
                $q->where('media_role', 'member')
                  ->orWhere('role', '<=', 2);
            });

            if (trim($query) !== '') {
                $membersQuery->where(function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                      ->orWhere('username', 'like', "%{$query}%");
                });
            }

            $members = $membersQuery->get(['id', 'mongodb_id', 'name', 'username', 'image']);
            $memberIds = $members->pluck('id')->toArray();

            // All tasks where author or collaborator
            $tasks = MediaTask::with('collaborators')
                ->whereIn('user_id', $memberIds)
                ->orWhereHas('collaborators', function ($q) use ($memberIds) {
                    $q->whereIn('user_id', $memberIds);
                })
                ->get(['id', 'user_id', 'created_at']);

            $now = Carbon::now();

            $streaks = $members->map(function ($member) use ($tasks, $now) {
                $mId = $member->id;

                $authoredTasks = $tasks->filter(fn($t) => $t->user_id === $mId);
                $collabTasks = $tasks->filter(function ($t) use ($mId) {
                    return $t->collaborators->contains('id', $mId);
                });

                $streakTaskCount = 0;
                $weekIndex = 0;

                while (true) {
                    $tasksInWeek = $authoredTasks->filter(function ($t) use ($now, $weekIndex) {
                        $daysAgo = $now->diffInDays($t->created_at);
                        return $daysAgo >= $weekIndex * 7 && $daysAgo < ($weekIndex + 1) * 7;
                    });

                    if ($tasksInWeek->count() > 0) {
                        $streakTaskCount += $tasksInWeek->count();
                        $weekIndex++;
                    } else {
                        if ($weekIndex === 0) {
                            $weekIndex++;
                        } else {
                            break;
                        }
                    }
                }

                $hasTaskThisWeek = $authoredTasks->merge($collabTasks)->contains(function ($t) use ($now) {
                    return $now->diffInDays($t->created_at) < 7;
                });

                return [
                    'id' => (string) ($member->mongodb_id ?: $member->id),
                    'numeric_id' => $member->id,
                    'name' => $member->name,
                    'username' => $member->username ?: '',
                    'image' => $member->image ?: '/no-photo.png',
                    'totalTasks' => $authoredTasks->count(),
                    'totalCollabs' => $collabTasks->count(),
                    'streakCount' => $streakTaskCount,
                    'hasTaskThisWeek' => $hasTaskThisWeek,
                ];
            });

            $sorted = $streaks->sort(function ($a, $b) {
                $totalA = $a['totalTasks'] + $a['totalCollabs'];
                $totalB = $b['totalTasks'] + $b['totalCollabs'];
                if ($totalA !== $totalB) {
                    return $totalB <=> $totalA;
                }
                return $b['streakCount'] <=> $a['streakCount'];
            })->values()->all();

            return response()->json($sorted);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
