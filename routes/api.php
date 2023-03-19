<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [UserController::class, 'store'])->name('users.store');
Route::post('/login', [UserController::class, 'login'])->name('users.login');

Route::group(['prefix' => 'v1', 'middleware' => 'jwt.verify'],function () {
    Route::post('logout', [UserController::class, 'logout'])->name('users.logout');
});