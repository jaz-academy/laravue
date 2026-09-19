<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\AdminStudent;
use App\Models\Reflection;
use App\Models\User;
use App\Services\MediaFormatter;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReflectionMediaController extends Controller
{
    /**
     * Get feed of reflections across all students.
     */
    public function index(Request $request)
    {
        try {
            $query = Reflection::with(['user.adminStudent', 'user.adminTeacher', 'student'])
                ->orderBy('date', 'desc')
                ->orderBy('id', 'desc');

            if ($request->filled('student_id')) {
                $query->where('admin_student_id', $request->student_id);
            }

            if ($request->filled('user_id')) {
                $query->where('user_id', $request->user_id);
            }

            $perPage = (int) $request->input('per_page', 15);
            $paginator = $query->paginate($perPage);

            $formatted = collect($paginator->items())->map(function ($ref) {
                $prevReflection = Reflection::where(function ($q) use ($ref) {
                    if ($ref->admin_student_id) {
                        $q->where('admin_student_id', $ref->admin_student_id);
                    } else {
                        $q->where('user_id', $ref->user_id);
                    }
                })
                ->where('date', '<', $ref->date)
                ->orderBy('date', 'desc')
                ->first();

                return MediaFormatter::formatReflection($ref, $prevReflection);
            });

            return response()->json([
                'success' => true,
                'data' => $formatted,
                'pagination' => [
                    'currentPage' => $paginator->currentPage(),
                    'lastPage' => $paginator->lastPage(),
                    'perPage' => $paginator->perPage(),
                    'total' => $paginator->total(),
                    'hasMore' => $paginator->hasMorePages(),
                ],
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Store or update a reflection.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'achievement' => 'nullable|array',
            'achievement.nilai' => 'nullable|numeric|min:0|max:100',
            'achievement.deskripsi' => 'nullable|string',
            'obstacles' => 'nullable|array',
            'obstacles.nilai' => 'nullable|numeric|min:0|max:100',
            'obstacles.deskripsi' => 'nullable|string',
            'lessons' => 'nullable|array',
            'lessons.nilai' => 'nullable|numeric|min:0|max:100',
            'lessons.deskripsi' => 'nullable|string',
            'priority' => 'nullable|array',
            'priority.nilai' => 'nullable|numeric|min:0|max:100',
            'priority.deskripsi' => 'nullable|string',
            'health' => 'nullable|array',
            'health.nilai' => 'nullable|numeric|min:0|max:100',
            'health.deskripsi' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['success' => false, 'error' => 'Unauthorized'], 401);
            }

            $isAdmin = (
                $user->media_role === 'admin' ||
                $user->media_role === 'mentor' ||
                $user->role >= 3 ||
                $user->admin_teacher_id
            );

            $studentId = $user->admin_student_id;
            $targetUserId = $user->id;

            // Admin can dynamically input reflection for any student
            if ($isAdmin && $request->filled('admin_student_id')) {
                $studentId = (int) $request->input('admin_student_id');
                $targetStudent = AdminStudent::with('user')->find($studentId);
                // Student's user_id if they have a linked user account, or fallback to admin user_id
                $targetUserId = $targetStudent?->user?->id ?: $user->id;
            } elseif (!$studentId && $request->filled('admin_student_id')) {
                $studentId = (int) $request->input('admin_student_id');
            }

            $date = Carbon::parse($request->date)->format('Y-m-d');

            $formatIndicator = function ($input) {
                if (is_null($input) || !is_array($input)) {
                    return ['nilai' => 0, 'deskripsi' => ''];
                }
                return [
                    'nilai' => isset($input['nilai']) ? (float) $input['nilai'] : 0.0,
                    'deskripsi' => isset($input['deskripsi']) ? trim((string) $input['deskripsi']) : '',
                ];
            };

            $matchCriteria = [];
            if ($studentId) {
                $matchCriteria = [
                    'admin_student_id' => $studentId,
                    'date' => $date,
                ];
            } else {
                $matchCriteria = [
                    'user_id' => $targetUserId,
                    'date' => $date,
                ];
            }

            $reflection = Reflection::updateOrCreate(
                $matchCriteria,
                [
                    'user_id' => $targetUserId,
                    'admin_student_id' => $studentId,
                    'achievement' => $formatIndicator($request->achievement),
                    'obstacles' => $formatIndicator($request->obstacles),
                    'lessons' => $formatIndicator($request->lessons),
                    'priority' => $formatIndicator($request->priority),
                    'health' => $formatIndicator($request->health),
                ]
            );

            $reflection->load(['user.adminStudent', 'user.adminTeacher', 'student']);

            $prevReflection = Reflection::where(function ($q) use ($reflection) {
                if ($reflection->admin_student_id) {
                    $q->where('admin_student_id', $reflection->admin_student_id);
                } else {
                    $q->where('user_id', $reflection->user_id);
                }
            })
            ->where('date', '<', $reflection->date)
            ->orderBy('date', 'desc')
            ->first();

            return response()->json([
                'success' => true,
                'message' => 'Refleksi mingguan berhasil disimpan',
                'data' => MediaFormatter::formatReflection($reflection, $prevReflection),
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Get a single reflection.
     */
    public function show($id)
    {
        try {
            $ref = Reflection::with(['user.adminStudent', 'user.adminTeacher', 'student'])->findOrFail($id);

            $prevReflection = Reflection::where(function ($q) use ($ref) {
                if ($ref->admin_student_id) {
                    $q->where('admin_student_id', $ref->admin_student_id);
                } else {
                    $q->where('user_id', $ref->user_id);
                }
            })
            ->where('date', '<', $ref->date)
            ->orderBy('date', 'desc')
            ->first();

            return response()->json([
                'success' => true,
                'data' => MediaFormatter::formatReflection($ref, $prevReflection),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => 'Refleksi tidak ditemukan',
            ], 404);
        }
    }

    /**
     * Get reflections for current logged-in user.
     */
    public function myReflections(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['success' => false, 'error' => 'Unauthorized'], 401);
            }

            $query = Reflection::with(['user.adminStudent', 'user.adminTeacher', 'student'])
                ->where(function ($q) use ($user) {
                    $q->where('user_id', $user->id);
                    if ($user->admin_student_id) {
                        $q->orWhere('admin_student_id', $user->admin_student_id);
                    }
                })
                ->orderBy('date', 'desc');

            $reflections = $query->get();

            $formatted = $reflections->map(function ($ref) {
                $prevReflection = Reflection::where(function ($q) use ($ref) {
                    if ($ref->admin_student_id) {
                        $q->where('admin_student_id', $ref->admin_student_id);
                    } else {
                        $q->where('user_id', $ref->user_id);
                    }
                })
                ->where('date', '<', $ref->date)
                ->orderBy('date', 'desc')
                ->first();

                return MediaFormatter::formatReflection($ref, $prevReflection);
            });

            return response()->json([
                'success' => true,
                'data' => $formatted,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a reflection (Admin & Mentor only).
     */
    public function destroy($id)
    {
        try {
            $user = Auth::user();
            $isAuthorized = $user && (
                $user->media_role === 'admin' ||
                $user->media_role === 'mentor' ||
                $user->role >= 3 ||
                $user->admin_teacher_id
            );

            if (!$isAuthorized) {
                return response()->json([
                    'success' => false,
                    'error' => 'Unauthorized: Hanya admin atau mentor yang memiliki hak akses untuk menghapus data refleksi',
                ], 403);
            }

            $reflection = Reflection::findOrFail($id);
            $reflection->delete();

            return response()->json([
                'success' => true,
                'message' => 'Data refleksi berhasil dihapus',
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Data refleksi tidak ditemukan',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => 'Gagal menghapus refleksi: ' . $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Get list of active students for dropdown selection (Admin use).
     */
    public function studentsSelect()
    {
        try {
            $students = AdminStudent::whereNull('graduation')
                ->with('user:id,name,admin_student_id,username,image')
                ->orderBy('name', 'asc')
                ->get();

            $data = $students->map(function ($s) {
                return [
                    'id' => $s->id,
                    'name' => $s->name,
                    'nickname' => $s->nickname ?: $s->name,
                    'nis' => $s->nis,
                    'role' => $s->role,
                    'image' => MediaFormatter::formatAvatarUrl($s->image ?: ($s->user?->image ?: null)),
                    'user_id' => $s->user?->id,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'error' => 'Gagal memuat daftar siswa: ' . $e->getMessage(),
            ], 500);
        }
    }
}
