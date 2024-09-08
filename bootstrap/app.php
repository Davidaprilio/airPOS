<?php

use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Sentry\Laravel\Integration;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append(middleware: [
            \App\Http\Middleware\LoggingRequest::class
        ]);

        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        Integration::handles($exceptions);

        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->routeIs('api.*')) {
                return response()->json([
                    'error' => 'Not Found',
                    'msg' => $e->getMessage(),
                ], Response::HTTP_NOT_FOUND);
            }
        });
        
        $exceptions->render(function (ValidationException $e, Request $request) {
            if ($request->routeIs('api.*')) {
                return response()->json([
                    'error' => 'Validation Error',
                    'msg' => 'Please check your request.',
                    'errors' => $e->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        });

        $exceptions->render(function (HttpException $e, Request $request) {
            if ($request->routeIs('api.*')) {
                return response()->json([
                    'error' => 'Request Error',
                    'trace_id' => $request->server('X_REQUEST_ID'),
                    'msg' => $e->getMessage(),
                    'code' => $e->getCode(),
                ], $e->getStatusCode());
            }
        });

        // handling Internal Server Error
        $exceptions->render(function (\Throwable $e, Request $request) {
            if ($request->routeIs('api.*')) {
                // render if use dd() function
                if ($e instanceof ErrorException && $e->getSeverity() === 2) return;
                // if ($e instanceof \Symfony\Component\ErrorHandler\Error\FatalError) return;
    
                $errorRes = [
                    'error' => 'Internal Server Error',
                    'trace_id' => $request->server('X_REQUEST_ID'),
                    'msg' => 'Something went wrong. Please try again later.',
                ];
    
                if ($e instanceof QueryException) {
                    $errorRes['sql'] = $e->getSql();
                    $errorRes['args'] = $e->getBindings();
                }
    
                if (env('APP_ENV') !== 'production') {
                    $errorRes['msg'] = $e->getMessage();
                    $errorRes['trace'] = $e->getTrace();
                }
    
                return response()->json(
                    data: $errorRes, 
                    status: Response::HTTP_INTERNAL_SERVER_ERROR
                );
            }
        });

        // dd($exceptions);
    })->create();
