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
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('desc')->nullable();
            $table->string('img')->nullable();
            $table->unsignedTinyInteger('type')->default(0)->comment("0:none 1:unit 2:variant");

            $table->foreignId('unit_id')->nullable()->constrained('units')->cascadeOnUpdate();
            $table->foreignId('busines_id')->nullable()->constrained('busineses')->cascadeOnUpdate();

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
        Schema::dropIfExists('materials');
    }
};
