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
        Schema::create('units', function (Blueprint $table) {
            $table->id();

            $table->boolean('is_universal')->default(false);
            $table->char('symbol', 6);
            $table->string('name', 50);
            $table->unsignedTinyInteger('type')->comment('0:pcs 1:mass 2:volume 3:length');
            $table->foreignId('parent_unit_id')->nullable()->constrained('units')->cascadeOnUpdate();
            $table->float('conversion_factor')->default(1);

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
        Schema::dropIfExists('units');
    }
};
