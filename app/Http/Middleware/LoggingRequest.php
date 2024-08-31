<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class LoggingRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $requestId = Str::uuid()->toString();
        $request->server->add([
            'X_REQUEST_ID' => $requestId
        ]);
        Log::withContext([
            'request-id' => $requestId
        ]);

        // continue request
        $res = $next($request);

        $res_time = ((microtime(true) - LARAVEL_START) * 1_000); // ms
        $res->headers->set(
            key: 'X-Req-Id',
            values: $requestId,
        );
        $res->headers->set(
            key: 'X-Res-Time',
            values: $res_time
        );

        return $res;
    }
}
