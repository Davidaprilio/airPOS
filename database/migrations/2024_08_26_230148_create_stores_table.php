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
        $tableNames = config('permission.table_names');

        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('busines_id')->constrained('busineses')->cascadeOnUpdate();
            $table->string('name');

            $table->foreignId('location_id')->nullable()->constrained('locations')->cascadeOnUpdate();
            $table->string('address')->nullable();
            $table->string('latlong')->nullable();

            $table->actionByUser(softDelete: true);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table($tableNames['roles'], function(Blueprint $table) {
            $table->foreignId('store_id')->after('busines_id')->constrained('stores')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tableNames = config('permission.table_names');

        Schema::table($tableNames['roles'], function(Blueprint $table) {
            $table->dropConstrainedForeignId('store_id');
        });
        Schema::dropIfExists('stores');
    }
};
