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
        Schema::create('payment_billings', function (Blueprint $table) {
            $table->id();
            $table->integer('year');
            $table->string('category');
            $table->foreignId('finance_account_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->integer('amount')->default(0);
            $table->boolean('is_once')->default(false);
            $table->boolean('is_monthly')->default(false);
            $table->string('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_billings');
    }
};
