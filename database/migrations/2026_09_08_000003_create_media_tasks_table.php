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
        Schema::create('media_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('mongodb_id', 36)->nullable()->index();
            $table->foreignId('media_project_id')->constrained('media_projects')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // author
            $table->text('media_url')->nullable();
            $table->json('media_urls')->nullable();
            $table->string('media_type')->default('image'); // image, video, document
            $table->text('caption')->nullable();
            $table->string('status')->default('pending'); // pending, reviewed, approved, rejected
            
            // Review
            $table->foreignId('mentor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->decimal('grade', 5, 2)->nullable();
            $table->text('review_comment')->nullable();
            $table->timestamp('reviewed_at')->nullable();

            $table->timestamps();
        });

        Schema::create('media_task_collaborators', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_task_id')->constrained('media_tasks')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['media_task_id', 'user_id']);
        });

        Schema::create('media_task_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_task_id')->constrained('media_tasks')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['media_task_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_task_likes');
        Schema::dropIfExists('media_task_collaborators');
        Schema::dropIfExists('media_tasks');
    }
};
