<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTasksRequest;
use App\Http\Requests\UpdateTasksRequest;
use App\Models\Tasks;
use App\Services\ResponseService;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    private $tasks;

    public function __construct(Tasks $tasks)
    {
        $this->tasks = $tasks;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new TasksResourceCollection($this->tasks->index());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTasksRequest $request)
    {
        try {
            $data = $this->tasks->store($request->all());
        } catch (\Throwable|\Exception $error) {
            return ResponseService::exception('tasks.store', null, $error);
        }

        return new TaskResource($data, array('type' => 'store', 'route' => 'tasks.store'));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $data = $this->tasks->show($id);
        } catch (\Throwable|\Exception $error) {
            return ResponseService::exception('tasks.show', $id, $error);
        }

        return new TaskResource($data, array('type' => 'show', 'route' => 'tasks.show'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Tasks  $tasks
     * @return \Illuminate\Http\Response
     */
    public function tasksByList($id)
    {
        try {
            $data = $this->tasks->tasksByList($id);
        } catch (\Throwable|\Exception $error) {
            return ResponseService::exception('tasks.tasksByList', $id, $error);
        }

        return new TaskResourceCollection($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Tasks  $tasks
     * @return \Illuminate\Http\Response
     */
    public function closeTask($id)
    {
        try {
            $data = $this->tasks->closeTask($id);
        } catch (\Throwable|\Exception $error) {
            return ResponseService::exception('tasks.closeTask', $id, $error);
        }

        return new TaskResource($data, array('type' => 'update', 'route' => 'tasks.closeTask'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $data = $this->tasks->udate($request->all(), $id);
        } catch (\Throwable|\Exception $error) {
            return ResponseService::exception('tasks.update', $id, $error);
        }

        return new TaskResource($data, array('type' => 'update', 'route' => 'tasks.update'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $data = $this->tasks->destroyTask($id);
        } catch (\Throwable|\Exception $error) {
            return ResponseService::exception('tasks.destroy', $id, $error);
        }

        return new TaskResource($data, array('type' => 'destroy', 'route' => 'tasks.destroy'));
    }
}
