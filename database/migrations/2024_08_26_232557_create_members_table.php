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
        Schema::create('members', function (Blueprint $table) {
            $table->id();

            $table->foreignUuid('customer_id')->constrained('customers')->comment('all member have customer data');
            $table->foreignId('busines_id')->constrained('busineses')->cascadeOnUpdate();
            $table->foreignId('store_id')->constrained('stores')->cascadeOnUpdate();
            $table->foreignId('member_type_id')->constrained('member_types')->cascadeOnUpdate();

            $table->actionByUser(softDelete: true);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('customers', function(Blueprint $table) {
            $table->foreign('member_id')->references('id')->on('members')->cascadeOnUpdate(); // has one denormalize
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropConstrainedForeignId('member_id');
        });
        Schema::dropIfExists('members');
    }
};
