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
        Schema::create('reflections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('admin_student_id')->nullable()->constrained('admin_students')->cascadeOnDelete();
            $table->date('date');
            $table->jsonb('achievement')->nullable();
            $table->jsonb('obstacles')->nullable();
            $table->jsonb('lessons')->nullable();
            $table->jsonb('priority')->nullable();
            $table->jsonb('health')->nullable();
            $table->timestamps();

            $table->index(['admin_student_id', 'date']);
            $table->index(['user_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reflections');
    }
};
