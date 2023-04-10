<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTasksRequest;
use App\Http\Requests\UpdateTasksRequest;
use App\Models\Tasks;
use App\Services\ResponseService;
use App\Transformers\Tasks\TasksResource;
use App\Transformers\Tasks\TasksResourceCollection;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    private $tasks;

    public function __construct(Tasks $tasks)
    {
        $this->tasks = $tasks;
    }

    public function index()
    {
        return new TasksResourceCollection($this->tasks->index());
    }

    public function store(StoreTasksRequest $request)
    {
        try {
            $data = $this->tasks->store($request->all());
        } catch (\Throwable|\Exception $error) {
            return ResponseService::exception('tasks.store', null, $error);
        }

        return new TasksResource($data, array('type' => 'store', 'route' => 'tasks.store'));
    }

    public function show($id)
    {
        try {
            $data = $this->tasks->show($id);
        } catch (\Throwable|\Exception $error) {
            return ResponseService::exception('tasks.show', $id, $error);
        }

        return new TasksResource($data, array('type' => 'show', 'route' => 'tasks.show'));
    }

    public function tasksByList($id)
    {
        try{        
            $data = $this
            ->tasks
            ->tasksByList($id);
        }catch(\Throwable|\Exception $e){
            return ResponseService::exception('tasks.tasksByList',$id,$e);
        }

        return new TasksResourceCollection($data);
    }

    public function closeTask($id)
    {
        try{        
            $data = $this
            ->tasks
            ->closeTask($id);
        }catch(\Throwable|\Exception $e){
            return ResponseService::exception('tasks.closeTask',$id,$e);
        }

        return new TasksResource($data,array('type' => 'update','route' => 'tasks.closeTask'));
    }

    public function update(Request $request, $id)
    {
        try {
            $data = $this->tasks->udate($request->all(), $id);
        } catch (\Throwable|\Exception $error) {
            return ResponseService::exception('tasks.update', $id, $error);
        }

        return new TasksResource($data, array('type' => 'update', 'route' => 'tasks.update'));
    }

    public function destroy($id)
    {
        try {
            $data = $this->tasks->destroyTask($id);
        } catch (\Throwable|\Exception $error) {
            return ResponseService::exception('tasks.destroy', $id, $error);
        }

        return new TasksResource($data, array('type' => 'destroy', 'route' => 'tasks.destroy'));
    }
}
