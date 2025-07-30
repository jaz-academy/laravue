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
        Schema::create('payment_items', function (Blueprint $table) {
            $table->id();
            $table->string('invoice');
            $table->date('date');
            $table->integer('period')->default(date('Y'));
            $table->foreignId('admin_student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('finance_account_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('payment_billing_id')->nullable()->constrained()->cascadeOnDelete();
            $table->integer('amount');
            $table->boolean('is_once')->default(0);
            $table->boolean('is_monthly')->default(0);
            $table->string('admin')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_items');
    }
};
