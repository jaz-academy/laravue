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
        Schema::table('users', function (Blueprint $table) {
            $table->string('mongodb_id', 36)->nullable()->index();
            $table->string('username')->nullable()->unique();
            $table->text('bio')->nullable();
            $table->json('skills')->nullable();
            $table->string('instagram_id')->nullable()->unique();
            $table->string('media_role')->default('member');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'mongodb_id',
                'username',
                'bio',
                'skills',
                'instagram_id',
                'media_role',
            ]);
        });
    }
};
