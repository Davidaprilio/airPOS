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
        Schema::create('purchases', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->boolean('is_member');
            $table->float('price');
            $table->float('discount');
            $table->float('tax');
            
            $table->unsignedTinyInteger('pay_type')->comment('1:cash, 2:qris');
            $table->foreignId('pay_type_id')->nullable(); // eg qris vendor
            $table->float('pay_amount');
            $table->float('pay_amount_due');
            $table->float('pay_change');

            $table->foreignUuid('customer_id');
            $table->foreignId('busines_id');
            $table->foreignId('store_id');

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
        Schema::dropIfExists('purchases');
    }
};
