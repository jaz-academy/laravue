<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\MediaTask;
use App\Models\User;
use App\Services\MediaFormatter;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationMediaController extends Controller
{
    /**
     * Get pending task notifications (for mentors/admins)
     */
    public function pendingTasks()
    {
        try {
            $tasks = MediaTask::with(['user', 'collaborators', 'project'])
                ->where('status', 'pending')
                ->orderByDesc('created_at')
                ->get();

            $formatted = $tasks->map(function ($task) {
                return MediaFormatter::formatTask($task);
            });

            return response()->json([
                'success' => true,
                'data' => $formatted,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get reviewed task notifications
     */
    public function reviewedTasks()
    {
        try {
            $tasks = MediaTask::with(['user', 'collaborators', 'project', 'mentor'])
                ->whereIn('status', ['reviewed', 'rejected'])
                ->orderByDesc('reviewed_at')
                ->get();

            $formatted = $tasks->map(function ($task) {
                return MediaFormatter::formatTask($task);
            });

            return response()->json([
                'success' => true,
                'data' => $formatted,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get system reminders
     */
    public function systemReminders()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 401);
        }

        try {
            $reminders = [];

            // Last task of this user
            $lastTask = MediaTask::where('user_id', $user->id)
                ->orWhereHas('collaborators', function ($q) use ($user) {
                    $q->where('user_id', $user->id);
                })
                ->orderByDesc('created_at')
                ->first();

            $now = Carbon::now();
            if (!$lastTask) {
                $reminders[] = [
                    'type' => 'no_post',
                    'message' => 'Anda belum pernah memposting tugas. Yuk mulai unggah karya Anda!',
                ];
            } else {
                $diffDays = $now->diffInDays($lastTask->created_at);
                if ($diffDays > 3) {
                    $reminders[] = [
                        'type' => 'inactive',
                        'message' => "Sudah {$diffDays} hari sejak postingan terakhir Anda. Ayo unggah progress terbaru!",
                    ];
                }
            }

            // Reminders for mentors/admins
            if ($user->admin_teacher_id || $user->role >= 3) {
                $pendingCount = MediaTask::where('status', 'pending')->count();
                if ($pendingCount > 0) {
                    $reminders[] = [
                        'type' => 'pending_review',
                        'message' => "Ada {$pendingCount} postingan yang menunggu untuk direview.",
                    ];
                }
            }

            return response()->json([
                'success' => true,
                'data' => $reminders,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get unread notification count
     */
    public function unreadCount()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(0);
        }

        try {
            $count = 0;
            if ($user->admin_teacher_id || $user->role >= 3) {
                $count = MediaTask::where('status', 'pending')->count();
            } else {
                $count = MediaTask::where('user_id', $user->id)
                    ->whereIn('status', ['reviewed', 'approved', 'rejected'])
                    ->count();
            }

            return response()->json($count);
        } catch (\Throwable $e) {
            return response()->json(0);
        }
    }
}
