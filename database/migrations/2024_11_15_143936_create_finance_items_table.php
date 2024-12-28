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
        Schema::create('finance_items', function (Blueprint $table) {
            $table->id();
            $table->string('invoice');
            $table->date('date');
            $table->string('vendor');
            $table->foreignId('finance_account_id')->constrained()->cascadeOnDelete();
            $table->string('remark');
            $table->string('description');
            $table->integer('amount');
            $table->string('admin')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('finance_items');
    }
};
