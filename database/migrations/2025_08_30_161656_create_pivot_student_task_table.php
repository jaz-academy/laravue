<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pivot_student_task', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('project_task_id')->constrained()->cascadeOnDelete();
            $table->string('role')->nullable();
            $table->integer('progress')->default(0);
            $table->timestamps();
        });

        // Pindahkan data legacy admin_student_id ke pivot
        $tasks = DB::table('project_tasks')->whereNotNull('admin_student_id')->get();
        foreach ($tasks as $task) {
            DB::table('pivot_student_task')->insert([
                'admin_student_id' => $task->admin_student_id,
                'project_task_id' => $task->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Drop kolom admin_student_id
        Schema::table('project_tasks', function (Blueprint $table) {
            if (Schema::hasColumn('project_tasks', 'admin_student_id')) {
                $table->dropForeign(['admin_student_id']);
                $table->dropColumn('admin_student_id');
                $table->dropColumn('embed');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Tambahkan kembali student_id ke tasks
        Schema::table('project_tasks', function (Blueprint $table) {
            $table->foreignId('admin_student_id')->nullable()->constrained()->nullOnDelete();
        });

        // Ambil kembali data dari pivot (ambil satu student pertama per task)
        $studentTasks = DB::table('pivot_student_task')->get();
        foreach ($studentTasks as $st) {
            DB::table('project_tasks')
                ->where('id', $st->project_task_id)
                ->update(['admin_student_id' => $st->admin_student_id]);
        }

        Schema::dropIfExists('pivot_student_task');
    }
};
