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
        Schema::create('purchase_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('purchase_id');
            $table->foreignId('product_id');
            $table->foreignId('unit_id');

            $table->string('unit_name');
            $table->string('product_name');

            $table->float('qty');
            $table->float('price');
            $table->float('price_total');
            $table->float('discount_total');

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
        Schema::dropIfExists('purchase_items');
    }
};
