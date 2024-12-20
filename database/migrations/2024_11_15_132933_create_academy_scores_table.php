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
        Schema::create('academy_scores', function (Blueprint $table) {
            $table->id();
            $table->string('serial');
            $table->foreignId('admin_student_id')->constrained()->cascadeOnDelete();
            $table->integer('semester');
            $table->foreignId('academy_competence_id')->constrained()->cascadeOnDelete();
            $table->integer('month_1')->nullable();
            $table->integer('month_2')->nullable();
            $table->integer('month_3')->nullable();
            $table->integer('month_4')->nullable();
            $table->integer('month_5')->nullable();
            $table->integer('month_6')->nullable();
            $table->boolean('is_ok_1')->default(false);
            $table->text('competence_1')->nullable();
            $table->boolean('is_ok_2')->default(false);
            $table->text('competence_2')->nullable();
            $table->boolean('is_ok_3')->default(false);
            $table->text('competence_3')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academy_scores');
    }
};
