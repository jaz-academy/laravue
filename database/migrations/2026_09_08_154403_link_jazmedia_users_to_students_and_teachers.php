<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $mapping = [
            // Students
            137 => ['student_id' => 21], // Berwyn Ijlal Junior
            138 => ['student_id' => 11], // Muhamad Radhan Wahid Assegaf
            139 => ['student_id' => 28], // Safaraz Qia Ayyashi
            140 => ['student_id' => 9],  // Ikhwanul Azka
            141 => ['student_id' => 27], // Rafandra Adelard Alif
            144 => ['student_id' => 24], // Muhammad Eza Arraffi Riono
            147 => ['student_id' => 17], // Amiratul Hisanah
            136 => ['student_id' => 23], // Danar Zenadine Francouer
            
            // Teachers / Mentors
            130 => ['teacher_id' => 1],  // Abdul Aziz (Mr. Abukafa)
            135 => ['teacher_id' => 2],  // Tia Selpiani (Ms. Tia)
            146 => ['teacher_id' => 7],  // Maruf Muhammad (Ust Maruf / Abudan)
            115 => ['teacher_id' => 1],  // Abdul Aziz
        ];

        foreach ($mapping as $userId => $target) {
            $user = \App\Models\User::find($userId);
            if ($user) {
                if (isset($target['student_id'])) {
                    $user->admin_student_id = $target['student_id'];
                }
                if (isset($target['teacher_id'])) {
                    $user->admin_teacher_id = $target['teacher_id'];
                }
                $user->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        \App\Models\User::whereIn('id', [137, 138, 139, 140, 141, 144, 147, 136])
            ->update(['admin_student_id' => null]);

        \App\Models\User::whereIn('id', [130, 135, 146])
            ->update(['admin_teacher_id' => null]);
    }
};
