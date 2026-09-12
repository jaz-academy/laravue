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
        Schema::create('media_blogs', function (Blueprint $table) {
            $table->id();
            $table->string('mongodb_id', 36)->nullable()->index();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt');
            $table->longText('content');
            $table->string('image')->nullable();
            $table->string('category')->index();
            $table->string('date')->nullable();
            $table->string('read_time')->nullable();
            $table->integer('likes')->default(0);
            $table->decimal('rating', 3, 2)->default(4.9);
            $table->integer('reviews_count')->default(0);
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('author_name')->nullable();
            $table->string('author_avatar')->nullable();
            $table->string('status')->default('PUBLISHED'); // DRAFT, PUBLISHED, ARCHIVED
            $table->timestamps();
        });

        Schema::create('media_blog_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_blog_id')->constrained('media_blogs')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['media_blog_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_blog_likes');
        Schema::dropIfExists('media_blogs');
    }
};
