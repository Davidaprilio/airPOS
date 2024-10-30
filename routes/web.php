<?php

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\Admin;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/product', [ProductController::class, 'createProduct']);
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dash/Home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('/stores')->group(function() {
        Route::get('/', [Admin\StoreController::class, 'index'])->name('store.index');
        Route::get('/detail/{product_id}', [Admin\StoreController::class, 'show'])->name('store.show');
        Route::get('/create', [Admin\StoreController::class, 'create'])->name('store.create');
        Route::post('/create', [Admin\StoreController::class, 'store']);
    });

    Route::prefix('/products')->group(function() {
        Route::get('/', [ProductController::class, 'index'])->name('product.index');
        Route::get('/detail/{product_id}', [ProductController::class, 'show'])->name('product.show');
        Route::get('/create', [ProductController::class, 'create'])->name('product.create');
        Route::post('/create', [ProductController::class, 'store']);
    });

    Route::prefix('/units')->group(function() {
        Route::get('/', [UnitController::class, 'index'])->name('unit.list');
    });
    
    Route::prefix('/settings')->group(function() {
    });
});


Route::inertia('/pos', 'POS/Main');

require __DIR__.'/auth.php';
