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

        Schema::create('busineses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partner_id')->constrained('partners')->cascadeOnUpdate();
            $table->string('name');
            $table->string('subdomain');

            $table->timestamp('end_subscribe_at');
            $table->foreignId('subscribe_plan_id')->constrained('subscribe_plans')->cascadeOnDelete();

            $table->actionByUser(softDelete: true);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table($tableNames['roles'], function(Blueprint $table) {
            $table->foreignId('busines_id')->nullable()->after('editable')->constrained('busineses')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tableNames = config('permission.table_names');

        Schema::table($tableNames['roles'], function(Blueprint $table) {
            $table->dropConstrainedForeignId('busines_id');
        });
        Schema::dropIfExists('busineses');
    }
};
