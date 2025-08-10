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
        Schema::create('academy_awards', function (Blueprint $table) {
            $table->id();
            $table->string('date');
            $table->foreignId('admin_student_id')->constrained()->cascadeOnDelete();
            $table->integer('semester');
            $table->foreignId('academy_subject_id');
            $table->string('item');
            $table->integer('rate');
            $table->string('result');
            $table->foreignId('admin_teacher_id');
            $table->string('remark')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academy_awards');
    }
};
