<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function() {

    Route::get('/logout', [AuthController::class, 'logout' ]);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //product Section

    Route::get('/products', [ProductController::class, 'index']);

    Route::get('/products/create', [ProductController::class, 'create']);

    Route::post('/products/create', [ProductController::class, 'store']);

    Route::delete('/products/{product}/delete', [ProductController::class, 'destroy']);

    Route::get('/products/{product}/edit', [ProductController::class, 'edit']);

    Route::put('/products/{product}/edit',  [ProductController::class, 'update']);

    Route::post('/products/{product}/imageupdate', [ProductController::class, 'imageUpdate']);

    //category Section

    Route::get('/categories', [CategoryController::class, 'index']);

    Route::post('/categories/create', [CategoryController::class, 'store']);

    Route::delete('/categories/{category}/delete', [CategoryController::class, 'destroy']);

    Route::get('/categories/{category}/edit', [CategoryController::class, 'edit']);

    Route::put('/categories/{category}/edit',  [CategoryController::class, 'update']);

    //cart Section

    Route::post('/cart/add', [CartController::class, 'add']);

    Route::post('/cart/confirm', [CartController::class, 'confirm']);

    Route::get('/cart/{id}/receipt', [CartController::class, 'receipt']);

    //sale Section

    Route::get('sales', [SaleController::class, 'index']);




});

Route::post('/login', [AuthController::class, 'login' ]);

Route::post('/register', [AuthController::class, 'register' ]);





