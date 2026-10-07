const fs = require('fs');
let code = fs.readFileSync('app/Http/Controllers/Api/Media/UserMediaController.php', 'utf8');

const start = code.indexOf('public function publicProfile');
const end = code.indexOf('public function uploadPicture');

if (start === -1 || end === -1) {
  console.log('Could not find start or end bounds');
  process.exit(1);
}

const newMethod = `public function publicProfile(\\Illuminate\\Http\\Request $request, $userId)
    {
        try {
            $type = $request->query('type');
            $user = null;
            $student = null;
            $teacher = null;
            $currentUserId = \\Illuminate\\Support\\Facades\\Auth::guard('sanctum')->id();

            if ($type === 'student') {
                $student = \\App\\Models\\AdminStudent::find((int)$userId);
                if ($student) {
                    $user = \\App\\Models\\User::where('admin_student_id', $student->id)->first();
                }
            } elseif ($type === 'teacher') {
                $teacher = \\App\\Models\\AdminTeacher::find((int)$userId);
                if ($teacher) {
                    $user = \\App\\Models\\User::where('admin_teacher_id', $teacher->id)->first();
                }
            } else {
                // Legacy fallback or standard user
                if (is_numeric($userId)) {
                    $student = \\App\\Models\\AdminStudent::find((int)$userId);
                    if ($student) {
                        $user = \\App\\Models\\User::where('admin_student_id', $student->id)->first();
                    }
                }
                if (!$user) {
                    $user = $this->resolveUser($userId);
                }
            }

            if ($user) {
                $profileData = \\App\\Services\\MediaFormatter::formatUser($user);
            } elseif ($student) {
                // Fallback for legacy student without a user record
                $skills = [];
                if (!empty($student->skills)) {
                    $skills = is_array($student->skills) ? $student->skills : (json_decode($student->skills, true) ?: []);
                }
                $profileData = [
                    'id' => (string) $student->id,
                    '_id' => (string) $student->id,
                    'student_id' => $student->id,
                    'name' => $student->name,
                    'username' => $student->nickname ?: '',
                    'email' => $student->email ?: '',
                    'image' => \\App\\Services\\MediaFormatter::formatAvatarUrl($student->image),
                    'bio' => $student->note ?: ($student->ambition ?: ''),
                    'skills' => $skills,
                    'role' => 'student',
                    'role_number' => 2,
                    'student_role' => $student->role,
                    'instagramId' => $student->instagram,
                    'banner_image' => null,
                    'headline' => null,
                    'address_detail' => null,
                    'education' => [],
                    'recommendations' => [],
                ];
            } elseif ($teacher) {
                // Fallback for legacy teacher without a user record
                $profileData = [
                    'id' => (string) $teacher->id,
                    '_id' => (string) $teacher->id,
                    'teacher_id' => $teacher->id,
                    'name' => $teacher->name,
                    'username' => '',
                    'email' => $teacher->email ?: '',
                    'image' => '/no-photo.png',
                    'bio' => '',
                    'skills' => [],
                    'role' => 'mentor',
                    'role_number' => 3,
                    'banner_image' => null,
                    'headline' => null,
                    'address_detail' => null,
                    'education' => [],
                    'recommendations' => [],
                ];
            } else {
                return response()->json(['success' => false, 'error' => 'Profil tidak ditemukan'], 404);
            }

            // Fetch tasks
            $tasks = collect([]);
            if (($user && $user->admin_student_id) || $student) {
                $sId = $user ? $user->admin_student_id : $student->id;
                $tasks = \\App\\Models\\MediaTask::with(['student', 'mentorTeacher', 'studentCollaborators', 'project', 'likes', 'comments.user'])
                    ->where('admin_student_id', $sId)
                    ->orWhereHas('studentCollaborators', function ($q) use ($sId) {
                        $q->where('admin_student_id', $sId);
                    })
                    ->orderByDesc('created_at')
                    ->get();
            } elseif (($user && $user->admin_teacher_id) || $teacher) {
                $tId = $user ? $user->admin_teacher_id : $teacher->id;
                $tasks = \\App\\Models\\MediaTask::with(['student', 'mentorTeacher', 'studentCollaborators', 'project', 'likes', 'comments.user'])
                    ->where('admin_teacher_id', $tId)
                    ->orderByDesc('created_at')
                    ->get();
            } elseif ($user) {
                $uId = $user->id;
                $tasks = \\App\\Models\\MediaTask::with(['student', 'mentorTeacher', 'studentCollaborators', 'project', 'likes', 'comments.user'])
                    ->where('user_id', $uId)
                    ->orWhereHas('collaborators', function ($q) use ($uId) {
                        $q->where('user_id', $uId);
                    })
                    ->orderByDesc('created_at')
                    ->get();
            }

            $formattedTasks = \\App\\Services\\MediaFormatter::formatTasks($tasks, $currentUserId);

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => $profileData,
                    'tasks' => $formattedTasks
                ]
            ]);
        } catch (\\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    `;

code = code.substring(0, start) + newMethod + code.substring(end);
fs.writeFileSync('app/Http/Controllers/Api/Media/UserMediaController.php', code);
console.log('done');
