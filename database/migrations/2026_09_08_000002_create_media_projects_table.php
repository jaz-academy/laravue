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
        Schema::create('media_projects', function (Blueprint $table) {
            $table->id();
            $table->string('mongodb_id', 36)->nullable()->index();
            $table->string('title');
            $table->text('description');
            $table->string('status')->default('active'); // active, completed, archived
            $table->foreignId('mentor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('project_manager_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('creator_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('media_project_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_project_id')->constrained('media_projects')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['media_project_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_project_participants');
        Schema::dropIfExists('media_projects');
    }
};
