<?php

namespace Database\Seeders;

use App\Models\AdminStudent;
use App\Models\AdminTeacher;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $students = [
            [
                'nis' => '20221045',
                'name' => 'Jhon Doe',
                'nickname' => 'jhon',
                'gender' => 'man',
            ],
            [
                'nis' => '20221030',
                'name' => 'Anabelle',
                'nickname' => 'belle',
                'gender' => 'woman',
            ],
        ];

        foreach ($students as $student) {
            AdminStudent::create($student);
        }

        $teachers = [
            [
                'nig' => '20326445',
                'name' => 'Abdullah',
                'nickname' => 'Ustadz Abdu',
                'gender' => 'man',
            ],
            [
                'nig' => '20326430',
                'name' => 'Maemunah',
                'nickname' => 'Ustadzah Mae',
                'gender' => 'woman',
            ],
        ];

        foreach ($teachers as $teacher) {
            AdminTeacher::create($teacher);
        }
    }
}
