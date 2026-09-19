<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\AdminStudent;
use App\Models\MediaProject;
use App\Models\MediaTask;
use App\Models\Reflection;
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

            $tasks = MediaTask::with(['student', 'mentorTeacher', 'studentCollaborators', 'project', 'likes', 'comments.user'])
                ->where(function ($q) use ($query) {
                    $q->where('caption', 'like', "%{$query}%")
                      ->orWhere('media_type', 'like', "%{$query}%")
                      ->orWhereHas('student', function ($sq) use ($query) {
                          $sq->where('name', 'like', "%{$query}%")
                             ->orWhere('nickname', 'like', "%{$query}%");
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
     * Search users / students by query
     */
    public function searchUsers(Request $request)
    {
        $query = $request->query('q', '');
        if (!$query) {
            return response()->json([]);
        }

        try {
            $studentsQuery = AdminStudent::query();

            // Default: only active students
            if ($request->query('status', 'active') === 'active') {
                $studentsQuery->whereNull('graduation');
            }

            $students = $studentsQuery->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('nickname', 'like', "%{$query}%")
                  ->orWhere('role', 'like', "%{$query}%")
                  ->orWhere('note', 'like', "%{$query}%");
            })
            ->limit(15)
            ->get();

            $data = $students->map(function ($s) {
                return [
                    'id' => (string) $s->id,
                    '_id' => (string) $s->id,
                    'name' => $s->name,
                    'username' => $s->nickname ?: '',
                    'image' => MediaFormatter::formatAvatarUrl($s->image),
                    'role' => $s->role ?: 'member',
                    'bio' => $s->note ?: ($s->ambition ?: ''),
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
                    'id' => (string) $p->id,
                    '_id' => (string) $p->id,
                    'title' => $p->title,
                    'description' => $p->description,
                    'cover' => $p->cover_url ?: '',
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
        $status = $request->query('status', 'active');

        try {
            $studentsQuery = AdminStudent::query();

            // Default: Filter only active students (graduation is null)
            if ($status === 'active' || ($request->has('graduated') && $request->graduated === '')) {
                $studentsQuery->whereNull('graduation');
            } elseif ($status === 'graduated') {
                $studentsQuery->whereNotNull('graduation')->where('graduation', '!=', 0);
            } elseif ($status === 'inactive') {
                $studentsQuery->where('graduation', 0);
            }

            if (trim($query) !== '') {
                $studentsQuery->where(function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                      ->orWhere('nickname', 'like', "%{$query}%");
                });
            }

            $students = $studentsQuery->with('user:id,admin_student_id')->get(['id', 'name', 'nickname', 'image']);
            $studentIds = $students->pluck('id')->toArray();
            $studentUserIds = $students->pluck('user.id')->filter()->toArray();

            // All tasks where student is author or collaborator
            $tasks = MediaTask::with('studentCollaborators')
                ->whereIn('admin_student_id', $studentIds)
                ->orWhereHas('studentCollaborators', function ($q) use ($studentIds) {
                    $q->whereIn('admin_students.id', $studentIds);
                })
                ->get(['id', 'admin_student_id', 'created_at']);

            $now = Carbon::now();
            $sevenDaysAgo = $now->copy()->subDays(7)->startOfDay();

            // Reflections in the past 7 days (1 week / 5 school days)
            $reflections = Reflection::where(function ($q) use ($studentIds, $studentUserIds) {
                    $q->whereIn('admin_student_id', $studentIds);
                    if (!empty($studentUserIds)) {
                        $q->orWhereIn('user_id', $studentUserIds);
                    }
                })
                ->where(function ($q) use ($sevenDaysAgo) {
                    $q->where('date', '>=', $sevenDaysAgo)
                      ->orWhere('created_at', '>=', $sevenDaysAgo);
                })
                ->get(['id', 'admin_student_id', 'user_id', 'date', 'created_at']);

            $streaks = $students->map(function ($student) use ($tasks, $reflections, $now, $sevenDaysAgo) {
                $sId = $student->id;

                $authoredTasks = $tasks->filter(fn($t) => $t->admin_student_id === $sId);
                $collabTasks = $tasks->filter(function ($t) use ($sId) {
                    return $t->studentCollaborators->contains('id', $sId);
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

                $userId = $student->user?->id;
                $hasReflectionThisWeek = $reflections->contains(function ($r) use ($sId, $userId, $sevenDaysAgo) {
                    $isOwner = ($r->admin_student_id && (int)$r->admin_student_id === (int)$sId) ||
                               ($userId && (int)$r->user_id === (int)$userId);
                    if (!$isOwner) {
                        return false;
                    }
                    $refDate = $r->date ? Carbon::parse($r->date) : $r->created_at;
                    return $refDate >= $sevenDaysAgo;
                });

                return [
                    'id' => (string) $student->id,
                    'numeric_id' => $student->id,
                    'name' => $student->name,
                    'username' => $student->nickname ?: '',
                    'image' => MediaFormatter::formatAvatarUrl($student->image),
                    'totalTasks' => $authoredTasks->count(),
                    'totalCollabs' => $collabTasks->count(),
                    'streakCount' => $streakTaskCount,
                    'hasTaskThisWeek' => $hasTaskThisWeek,
                    'hasReflectionThisWeek' => $hasReflectionThisWeek,
                ];
            });

            $sorted = $streaks->sort(function ($a, $b) {
                if ($b['streakCount'] !== $a['streakCount']) {
                    return $b['streakCount'] <=> $a['streakCount'];
                }
                if ($b['hasReflectionThisWeek'] !== $a['hasReflectionThisWeek']) {
                    return $b['hasReflectionThisWeek'] ? 1 : -1;
                }
                $totalA = $a['totalTasks'] + $a['totalCollabs'];
                $totalB = $b['totalTasks'] + $b['totalCollabs'];
                if ($totalA !== $totalB) {
                    return $totalB <=> $totalA;
                }
                return strcmp($a['name'], $b['name']);
            })->values()->all();

            return response()->json($sorted);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
