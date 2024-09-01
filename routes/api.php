<?php

use App\Http\Controllers\Api\UnitController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum', 'web')->name('api.')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('/units')->group(function() {
        Route::get('/', [UnitController::class, 'getListPaginate']);
    });
});
