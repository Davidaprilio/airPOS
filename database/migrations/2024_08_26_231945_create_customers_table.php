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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('busines_id')->constrained('busineses')->cascadeOnUpdate();
            $table->foreignId('partner_id')->constrained('partners')->cascadeOnUpdate();

            $table->string('name');
            $table->string('email', 100)->nullable();
            $table->string('phone', 16)->nullable();
            $table->foreignId('member_id')->nullable(); // has one denormalize

            $table->actionByUser(softDelete: true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
