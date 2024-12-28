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
        Schema::create('admin_schools', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('nickname', 255)->nullable();
            $table->integer('npsn')->nullable();
            $table->string('organization', 255)->nullable();
            $table->string('permit', 255)->nullable();
            $table->string('address', 255)->nullable();
            $table->string('map', 255)->nullable();
            $table->string('phone', 255)->nullable();
            $table->string('email', 255)->nullable();
            $table->string('motto', 255)->nullable();
            $table->integer('period')->nullable();
            $table->string('head', 255)->nullable();
            $table->string('contact', 255)->nullable();
            $table->string('notes', 255)->nullable();
            $table->string('logo', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_schools');
    }
};
