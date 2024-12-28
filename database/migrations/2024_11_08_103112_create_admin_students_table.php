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
        Schema::create('admin_students', function (Blueprint $table) {
            $table->id();
            $table->integer('nis')->unique();
            $table->string('name', 255);
            $table->string('nickname', 255);
            $table->string('gender', 255);
            $table->string('rumble', 255)->nullable();
            $table->string('birth_place', 255)->nullable();
            $table->date('birth_date')->nullable();
            $table->string('address', 255)->nullable();
            $table->string('hamlet', 255)->nullable();
            $table->string('village', 255)->nullable();
            $table->string('district', 255)->nullable();
            $table->string('city', 255)->nullable();
            $table->integer('postal_code')->nullable();
            $table->string('hobby', 255)->nullable();
            $table->string('sport', 255)->nullable();
            $table->string('ambition', 255)->nullable();
            $table->string('role', 255)->nullable();
            $table->string('skills', 255)->nullable();
            $table->string('own_phone', 255)->nullable();
            $table->string('email', 255)->nullable();
            $table->string('instagram', 255)->nullable();
            $table->string('father', 255)->nullable();
            $table->date('father_birth')->nullable();
            $table->string('father_note', 255)->nullable();
            $table->string('mother', 255)->nullable();
            $table->date('mother_birth')->nullable();
            $table->string('mother_note', 255)->nullable();
            $table->string('phone', 255)->nullable();
            $table->string('job', 255)->nullable();
            $table->string('income', 255)->nullable();
            $table->string('image', 255)->nullable();
            $table->string('payment_category', 255)->nullable();
            $table->integer('registered')->default(0);
            $table->integer('graduation')->default(0);
            $table->string('next_school', 255)->nullable();
            $table->string('next_school_address', 255)->nullable();
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_students');
    }
};
