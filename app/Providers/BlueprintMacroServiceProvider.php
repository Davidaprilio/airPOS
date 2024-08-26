<?php

namespace App\Providers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class BlueprintMacroServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Define a custom macro for Blueprint Schema
        Blueprint::macro('actionByUser', function (bool $softDelete = false) {
            /** @var Blueprint $this */
            $this->foreignId('created_by')->nullable();
            $this->foreignId('updated_by')->nullable();
            if ($softDelete) {
                $this->foreignId('deleted_by')->nullable();
            }
        });
    }
}
