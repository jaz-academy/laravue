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
        Schema::create('email_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('email')->unique();
            $table->string('imap_host')->nullable();
            $table->integer('imap_port')->nullable();
            $table->string('encryption')->default('ssl');
            $table->string('smtp_host')->nullable();
            $table->integer('smtp_port')->nullable();
            $table->text('password');
            $table->integer('quota_mb')->default(1000);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_accounts');
    }
};
