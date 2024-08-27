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
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id');
            $table->foreignId('busines_id');
            $table->foreignId('store_id')->nullable();

            $table->string('name', 100);
            $table->text('desc')->nullable();

            $table->boolean('only_member')->default(false);
            $table->unsignedTinyInteger('type')->comment('0: percent, 1:fixed')->default(1);
            $table->float('value');
            $table->float('max_value')->nullable();
            $table->integer('max_qty')->nullable();

            $table->integer('quota')->nullable();
            $table->integer('quota_used')->nullable();

            $table->timestamp('start_at')->nullable();
            $table->timestamp('end_at')->nullable();

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
        Schema::dropIfExists('discounts');
    }
};
