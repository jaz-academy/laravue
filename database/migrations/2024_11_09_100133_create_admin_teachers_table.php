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
        Schema::create('admin_teachers', function (Blueprint $table) {
            $table->id();
            $table->integer('nig')->unique();
            $table->string('name', 255);
            $table->string('nickname', 255);
            $table->string('gender', 255);
            $table->enum('status', ['Active', 'On Duty', 'Passive', 'Suspend'])->default('Active');
            $table->string('birth_place', 255)->nullable();
            $table->date('birth_date', 255)->nullable();
            $table->string('address', 255)->nullable();
            $table->string('hamlet', 255)->nullable();
            $table->string('village', 255)->nullable();
            $table->string('district', 255)->nullable();
            $table->string('city', 255)->nullable();
            $table->string('postal_code', 255)->nullable();
            $table->string('phone', 255)->nullable();
            $table->integer('registered')->default(0);
            $table->integer('grade')->default(1);
            $table->integer('resign')->default(1);
            $table->string('update_job', 255)->nullable();
            $table->string('image', 255)->nullable();
            $table->string('note', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_teachers');
    }
};
