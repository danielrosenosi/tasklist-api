<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskListController;
use App\Http\Controllers\TasksController;

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

Route::post('/login', [UserController::class, 'login'])->name('users.login');
Route::post('/register', [UserController::class, 'store'])->name('users.store');

Route::group(['prefix' => 'v1', 'middleware' => 'jwt.verify'],function () {
    Route::apiResources([
        'taskList' => TaskListController::class,
        'tasks' => TasksController::class
    ]);

    Route::put('task/close/{id}', [TasksController::class, 'closeTask'])->name('tasks.closeTask');
    Route::get('list/tasks/{id}', [TasksController::class, 'tasksByList'])->name('taskList.tasksByList');
    
    Route::post('completedTaskList', [TaskListController::class, 'completedTaskList'])->name('taskList.completedTaskList');
    Route::post('logout', [UserController::class, 'logout'])->name('users.logout');
});