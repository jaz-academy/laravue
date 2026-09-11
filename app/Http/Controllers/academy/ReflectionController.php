<?php

namespace App\Http\Controllers\academy;

use App\Http\Controllers\Controller;
use App\Models\Reflection;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReflectionController extends Controller
{
    /**
     * Display a listing of reflections.
     */
    public function index(Request $request)
    {
        try {
            $user = Auth::user();
            $query = Reflection::with('user:id,name,username,image');

            // If user_id is passed and current user has permission or is viewing own
            if ($request->filled('user_id')) {
                $query->where('user_id', $request->user_id);
            } else {
                // If student or regular user, restrict to own reflections
                if ($user) {
                    $query->where('user_id', $user->id);
                }
            }

            if ($request->filled('start_date')) {
                $query->whereDate('date', '>=', $request->start_date);
            }

            if ($request->filled('end_date')) {
                $query->whereDate('date', '<=', $request->end_date);
            }

            if ($request->filled('month') && $request->filled('year')) {
                $query->whereYear('date', $request->year)
                      ->whereMonth('date', $request->month);
            }

            $query->orderBy('date', 'desc');

            if ($request->boolean('all')) {
                $reflections = $query->get();
                return response()->json([
                    'status' => 'success',
                    'data' => $reflections,
                ]);
            }

            $perPage = $request->input('per_page', 15);
            $reflections = $query->paginate($perPage);

            return response()->json([
                'status' => 'success',
                'data' => $reflections->items(),
                'pagination' => [
                    'current_page' => $reflections->currentPage(),
                    'last_page' => $reflections->lastPage(),
                    'per_page' => $reflections->perPage(),
                    'total' => $reflections->total(),
                ],
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Timeline data endpoint for personal chart.
     */
    public function timeline(Request $request)
    {
        try {
            $user = Auth::user();
            $userId = $request->input('user_id', $user?->id);

            $query = Reflection::where('user_id', $userId);

            $startDate = $request->input('start_date');
            $endDate = $request->input('end_date');

            if ($startDate && $endDate) {
                $query->whereBetween('date', [$startDate, $endDate]);
            } else {
                // Default: last 30 days
                $query->where('date', '>=', Carbon::now()->subDays(30)->toDateString());
            }

            $reflections = $query->orderBy('date', 'asc')->get();

            $dates = [];
            $seriesAchievement = [];
            $seriesObstacles = [];
            $seriesLessons = [];
            $seriesPriority = [];
            $seriesHealth = [];

            $totalAchievement = 0;
            $totalObstacles = 0;
            $totalLessons = 0;
            $totalPriority = 0;
            $totalHealth = 0;
            $count = $reflections->count();

            foreach ($reflections as $ref) {
                $formattedDate = Carbon::parse($ref->date)->format('Y-m-d');
                $dates[] = $formattedDate;

                $achVal = isset($ref->achievement['nilai']) ? (float)$ref->achievement['nilai'] : 0;
                $obsVal = isset($ref->obstacles['nilai']) ? (float)$ref->obstacles['nilai'] : 0;
                $lesVal = isset($ref->lessons['nilai']) ? (float)$ref->lessons['nilai'] : 0;
                $prioVal = isset($ref->priority['nilai']) ? (float)$ref->priority['nilai'] : 0;
                $healthVal = isset($ref->health['nilai']) ? (float)$ref->health['nilai'] : 0;

                $seriesAchievement[] = $achVal;
                $seriesObstacles[] = $obsVal;
                $seriesLessons[] = $lesVal;
                $seriesPriority[] = $prioVal;
                $seriesHealth[] = $healthVal;

                $totalAchievement += $achVal;
                $totalObstacles += $obsVal;
                $totalLessons += $lesVal;
                $totalPriority += $prioVal;
                $totalHealth += $healthVal;
            }

            $averages = [
                'achievement' => $count > 0 ? round($totalAchievement / $count, 1) : 0,
                'obstacles' => $count > 0 ? round($totalObstacles / $count, 1) : 0,
                'lessons' => $count > 0 ? round($totalLessons / $count, 1) : 0,
                'priority' => $count > 0 ? round($totalPriority / $count, 1) : 0,
                'health' => $count > 0 ? round($totalHealth / $count, 1) : 0,
            ];

            return response()->json([
                'status' => 'success',
                'data' => [
                    'dates' => $dates,
                    'series' => [
                        [
                            'name' => 'Achievement',
                            'data' => $seriesAchievement,
                        ],
                        [
                            'name' => 'Obstacles',
                            'data' => $seriesObstacles,
                        ],
                        [
                            'name' => 'Lessons',
                            'data' => $seriesLessons,
                        ],
                        [
                            'name' => 'Priority',
                            'data' => $seriesPriority,
                        ],
                        [
                            'name' => 'Health',
                            'data' => $seriesHealth,
                        ],
                    ],
                    'averages' => $averages,
                    'total_entries' => $count,
                ],
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Store or update a reflection (upsert by user_id + date).
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
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = Auth::user();
            $userId = $request->input('user_id', $user?->id);

            $date = Carbon::parse($request->date)->format('Y-m-d');

            $formatIndicator = function ($input) {
                if (is_null($input)) {
                    return ['nilai' => 0, 'deskripsi' => ''];
                }
                return [
                    'nilai' => isset($input['nilai']) ? (float)$input['nilai'] : 0,
                    'deskripsi' => isset($input['deskripsi']) ? (string)$input['deskripsi'] : '',
                ];
            };

            $reflection = Reflection::updateOrCreate(
                [
                    'user_id' => $userId,
                    'date' => $date,
                ],
                [
                    'achievement' => $formatIndicator($request->achievement),
                    'obstacles' => $formatIndicator($request->obstacles),
                    'lessons' => $formatIndicator($request->lessons),
                    'priority' => $formatIndicator($request->priority),
                    'health' => $formatIndicator($request->health),
                ]
            );

            return response()->json([
                'status' => 'success',
                'message' => 'Refleksi berhasil disimpan',
                'data' => $reflection,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified reflection.
     */
    public function show($id)
    {
        try {
            $reflection = Reflection::with('user:id,name,username,image')->findOrFail($id);

            return response()->json([
                'status' => 'success',
                'data' => $reflection,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Refleksi tidak ditemukan',
            ], 404);
        }
    }

    /**
     * Update the specified reflection.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'sometimes|date',
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
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $reflection = Reflection::findOrFail($id);

            $formatIndicator = function ($input, $existing) {
                if (is_null($input)) {
                    return $existing;
                }
                return [
                    'nilai' => isset($input['nilai']) ? (float)$input['nilai'] : ($existing['nilai'] ?? 0),
                    'deskripsi' => isset($input['deskripsi']) ? (string)$input['deskripsi'] : ($existing['deskripsi'] ?? ''),
                ];
            };

            if ($request->has('achievement')) {
                $reflection->achievement = $formatIndicator($request->achievement, $reflection->achievement);
            }
            if ($request->has('obstacles')) {
                $reflection->obstacles = $formatIndicator($request->obstacles, $reflection->obstacles);
            }
            if ($request->has('lessons')) {
                $reflection->lessons = $formatIndicator($request->lessons, $reflection->lessons);
            }
            if ($request->has('priority')) {
                $reflection->priority = $formatIndicator($request->priority, $reflection->priority);
            }
            if ($request->has('health')) {
                $reflection->health = $formatIndicator($request->health, $reflection->health);
            }
            if ($request->filled('date')) {
                $reflection->date = Carbon::parse($request->date)->format('Y-m-d');
            }

            $reflection->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Refleksi berhasil diperbarui',
                'data' => $reflection,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified reflection.
     */
    public function destroy($id)
    {
        try {
            $reflection = Reflection::findOrFail($id);
            $reflection->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Refleksi berhasil dihapus',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
