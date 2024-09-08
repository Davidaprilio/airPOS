<?php

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum', 'web')->name('api.')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('/units')->group(function() {
        Route::get('/', [Api\UnitController::class, 'getListPaginate']);
    });
    
    Route::prefix('/products')->group(function() {
        Route::post('/', [ProductController::class, 'store'])->name('product.create');
    });
});
