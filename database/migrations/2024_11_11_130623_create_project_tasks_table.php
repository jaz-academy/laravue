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
        Schema::create('project_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_plan_id')->constrained()->cascadeOnDelete();
            $table->foreignId('admin_student_id')->constrained()->cascadeOnDelete();
            $table->integer('semester');
            $table->string('name');
            $table->text('description')->nullable();
            $table->date('date');
            $table->enum('status', ['Not Started', 'In Progress', 'Completed', 'On Hold', 'Cancelled']);
            $table->string('media')->nullable();
            $table->text('embed')->nullable();
            $table->text('link')->nullable();
            $table->tinyInteger('accepted')->default(0);
            $table->integer('rate')->default(0);
            $table->text('review')->nullable();
            $table->foreignId('admin_teacher_id')->nullable()->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_tasks');
    }
};
