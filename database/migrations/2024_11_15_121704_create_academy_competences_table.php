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
        Schema::create('academy_competences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('academy_subject_id')->constrained()->cascadeOnDelete();
            $table->integer('semester');
            $table->foreignId('admin_teacher_id')->constrained()->cascadeOnDelete();
            $table->text('competence_1')->nullable();
            $table->text('competence_2')->nullable();
            $table->text('competence_3')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academy_competences');
    }
};
