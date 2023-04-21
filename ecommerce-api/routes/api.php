<?php


use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\PurchaseOrderController;
use App\Http\Controllers\api\UserController;
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

Route::group(['prefix' => 'auth'], function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('login', 'login')->name('auth.login');
    });
});

Route::group(['prefix' => 'auth', 'middleware' => ['apiJwt']], function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('/logout', 'logout')->name('auth.logout');
    });
});

Route::group(['prefix' => 'users'], function () {
    Route::controller(UserController::class)->group(function () {
        Route::post('/store', 'store')->name('users.store');
        Route::post('/mail/resetCode', 'resetRequest')->name('users.api.cod.reset');
        Route::post('/validateCode', 'validateCode')->name('users.api.validate.code');
        Route::put('/updatePassword', 'updatePassword')->name('users.api.update.password');
    });
});

Route::group(['prefix' => 'users', 'middleware' => ['apiJwt']], function () {
    Route::controller(UserController::class)->group(function () {
        Route::put('/{user}', 'update')->name('users.update');
    });
});


Route::group(['prefix' => 'puschase', 'middleware' => ['apiJwt']], function () {
    Route::controller(PurchaseOrderController::class)->group(function () {
        Route::get('', 'index')->name('puschase.index');
        Route::post('', 'store')->name('puschase.store');
    });
});





