<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::before(function (User $user, $ability) {
            return $user->hasRole('root') ? true : null;
        });

        /**
         * Log SQL queries
         */
        if (config('app.debug', false)) {
            DB::listen(function(QueryExecuted $query) {
                $logLevel = match(true) {
                    $query->time > 5_000 => 'critical',
                    $query->time > 4_000 => 'emergency',
                    $query->time > 2_000 => 'alert',
                    $query->time > 800 => 'warning',
                    default => 'debug',
                };

                Log::stack(['sql_query'])->{$logLevel}(
                    message: "Req:". request(null)->server('X_REQUEST_ID').PHP_EOL.'SQL:' . $query->toRawSql(),
                    context: [
                        'sql' => $query->sql,
                        'bind' => $query->bindings,
                        'time' => $query->time,
                    ]
                );
            });
        }
    }
}
