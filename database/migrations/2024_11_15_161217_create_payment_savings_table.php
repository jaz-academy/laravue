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
        Schema::create('payment_savings', function (Blueprint $table) {
            $table->id();
            $table->string('invoice');
            $table->date('date');
            $table->foreignId('admin_student_id')->constrained()->cascadeOnDelete();
            $table->integer('credit')->default(0);
            $table->integer('debit')->default(0);
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
        Schema::dropIfExists('payment_savings');
    }
};
