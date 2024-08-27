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
        Schema::create('product_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('busines_id')->constrained('busineses')->cascadeOnUpdate();
            $table->foreignId('product_id')->constrained('products')->cascadeOnUpdate();
            $table->foreignId('material_id')->constrained('materials')->cascadeOnUpdate();
            $table->float('qty')->default(0);

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
        Schema::dropIfExists('product_components');
    }
};
