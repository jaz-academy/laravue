<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. media_tasks: tambah admin_student_id & admin_teacher_id, ubah user_id jadi nullable ON DELETE SET NULL
        Schema::table('media_tasks', function (Blueprint $table) {
            $table->foreignId('admin_student_id')->nullable()->constrained('admin_students')->nullOnDelete();
            $table->foreignId('admin_teacher_id')->nullable()->constrained('admin_teachers')->nullOnDelete();
            $table->unsignedBigInteger('user_id')->nullable()->change();
        });

        // Ubah foreign key user_id di media_tasks
        try {
            Schema::table('media_tasks', function (Blueprint $table) {
                $table->dropForeign(['user_id']);
                $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
            });
        } catch (\Throwable $e) {
            // fallback if constraint has custom name
        }

        // 2. reflections: tambah admin_student_id, ubah user_id jadi nullable ON DELETE SET NULL
        Schema::table('reflections', function (Blueprint $table) {
            $table->foreignId('admin_student_id')->nullable()->constrained('admin_students')->nullOnDelete();
            $table->unsignedBigInteger('user_id')->nullable()->change();
            $table->index(['admin_student_id', 'date']);
        });

        try {
            Schema::table('reflections', function (Blueprint $table) {
                $table->dropForeign(['user_id']);
                $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
            });
        } catch (\Throwable $e) {}

        // 3. media_task_collaborators: tambah admin_student_id
        Schema::table('media_task_collaborators', function (Blueprint $table) {
            $table->foreignId('admin_student_id')->nullable()->constrained('admin_students')->nullOnDelete();
            $table->unsignedBigInteger('user_id')->nullable()->change();
            $table->index(['media_task_id', 'admin_student_id']);
        });

        try {
            Schema::table('media_task_collaborators', function (Blueprint $table) {
                $table->dropForeign(['user_id']);
                $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
            });
        } catch (\Throwable $e) {}

        // 4. media_project_participants: tambah admin_student_id
        Schema::table('media_project_participants', function (Blueprint $table) {
            $table->foreignId('admin_student_id')->nullable()->constrained('admin_students')->nullOnDelete();
            $table->unsignedBigInteger('user_id')->nullable()->change();
            $table->index(['media_project_id', 'admin_student_id']);
        });

        try {
            Schema::table('media_project_participants', function (Blueprint $table) {
                $table->dropForeign(['user_id']);
                $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
            });
        } catch (\Throwable $e) {}

        // 5. media_projects: tambah admin_teacher_id untuk mentor
        Schema::table('media_projects', function (Blueprint $table) {
            $table->foreignId('admin_teacher_id')->nullable()->constrained('admin_teachers')->nullOnDelete();
        });

        // ========================================================
        // 6. BACKFILL DATA EKSIS DARI USERS
        // ========================================================
        $driver = DB::getDriverName();
        if ($driver === 'pgsql') {
            DB::statement("
                UPDATE media_tasks mt 
                SET admin_student_id = u.admin_student_id 
                FROM users u 
                WHERE mt.user_id = u.id AND u.admin_student_id IS NOT NULL;
            ");

            DB::statement("
                UPDATE media_tasks mt 
                SET admin_teacher_id = u.admin_teacher_id 
                FROM users u 
                WHERE mt.mentor_id = u.id AND u.admin_teacher_id IS NOT NULL;
            ");

            DB::statement("
                UPDATE reflections r 
                SET admin_student_id = u.admin_student_id 
                FROM users u 
                WHERE r.user_id = u.id AND u.admin_student_id IS NOT NULL;
            ");

            DB::statement("
                UPDATE media_task_collaborators mtc 
                SET admin_student_id = u.admin_student_id 
                FROM users u 
                WHERE mtc.user_id = u.id AND u.admin_student_id IS NOT NULL;
            ");

            DB::statement("
                UPDATE media_project_participants mpp 
                SET admin_student_id = u.admin_student_id 
                FROM users u 
                WHERE mpp.user_id = u.id AND u.admin_student_id IS NOT NULL;
            ");

            DB::statement("
                UPDATE media_projects mp 
                SET admin_teacher_id = u.admin_teacher_id 
                FROM users u 
                WHERE mp.mentor_id = u.id AND u.admin_teacher_id IS NOT NULL;
            ");
        } else {
            // MySQL syntax
            DB::statement("
                UPDATE media_tasks mt 
                JOIN users u ON mt.user_id = u.id 
                SET mt.admin_student_id = u.admin_student_id 
                WHERE u.admin_student_id IS NOT NULL;
            ");

            DB::statement("
                UPDATE media_tasks mt 
                JOIN users u ON mt.mentor_id = u.id 
                SET mt.admin_teacher_id = u.admin_teacher_id 
                WHERE u.admin_teacher_id IS NOT NULL;
            ");

            DB::statement("
                UPDATE reflections r 
                JOIN users u ON r.user_id = u.id 
                SET r.admin_student_id = u.admin_student_id 
                WHERE u.admin_student_id IS NOT NULL;
            ");

            DB::statement("
                UPDATE media_task_collaborators mtc 
                JOIN users u ON mtc.user_id = u.id 
                SET mtc.admin_student_id = u.admin_student_id 
                WHERE u.admin_student_id IS NOT NULL;
            ");

            DB::statement("
                UPDATE media_project_participants mpp 
                JOIN users u ON mpp.user_id = u.id 
                SET mpp.admin_student_id = u.admin_student_id 
                WHERE u.admin_student_id IS NOT NULL;
            ");

            DB::statement("
                UPDATE media_projects mp 
                JOIN users u ON mp.mentor_id = u.id 
                SET mp.admin_teacher_id = u.admin_teacher_id 
                WHERE u.admin_teacher_id IS NOT NULL;
            ");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('media_tasks', function (Blueprint $table) {
            $table->dropForeign(['admin_student_id']);
            $table->dropForeign(['admin_teacher_id']);
            $table->dropColumn(['admin_student_id', 'admin_teacher_id']);
        });

        Schema::table('reflections', function (Blueprint $table) {
            $table->dropForeign(['admin_student_id']);
            $table->dropColumn(['admin_student_id']);
        });

        Schema::table('media_task_collaborators', function (Blueprint $table) {
            $table->dropForeign(['admin_student_id']);
            $table->dropColumn(['admin_student_id']);
        });

        Schema::table('media_project_participants', function (Blueprint $table) {
            $table->dropForeign(['admin_student_id']);
            $table->dropColumn(['admin_student_id']);
        });

        Schema::table('media_projects', function (Blueprint $table) {
            $table->dropForeign(['admin_teacher_id']);
            $table->dropColumn(['admin_teacher_id']);
        });
    }
};
