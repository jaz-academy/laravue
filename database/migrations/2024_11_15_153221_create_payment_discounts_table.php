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
        Schema::create('payment_discounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_student_id')->constrained()->cascadeOnDelete();
            $table->integer('year');
            $table->foreignId('finance_account_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('payment_billing_id')->nullable()->constrained()->cascadeOnDelete();
            $table->integer('amount')->default(0);
            $table->string('note')->nullable();
            $table->string('admin')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_discounts');
    }
};
