<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskListRequest;
use App\Http\Requests\UpdateTaskListRequest;
use App\Models\TaskList;
use App\Services\ResponseService;
use App\Transformers\TaskList\TaskListResource;
use App\Transformers\TaskList\TaskListResourceCollection;
use Illuminate\Http\Request;

class TaskListController extends Controller
{
    private $taskList;

    public function __construct(TaskList $taskList)
    {
        $this->taskList = $taskList;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json($this->taskList->index());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(StoreTaskListRequest $request)
    {
        try {
            $data = $this->taskList->create($request->all());
        } catch (\Throwable|\Exception $error) {
            return ResponseService::exception('taskList.store', null, $error);
        }

        return new TaskListResource($data, array('type' => 'store', 'route' => 'taskList.store'));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $data = $this->taskList->show($id);
        } catch (\Throwable|\Exception $error) {
            return ResponseService::exception('taskList.show', $id, $error);
        }

        return new TaskListResource($data, array('type' => 'show', 'route' => 'taskList.show'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $data = $this->taskList->update($request->all(), $id);
        } catch(\Throwable|\Exception $error) {
            return ResponseService::exception('taskList.update', $id, $error);
        }

        return new TaskListResource($data, array('type' => 'update', 'route' => 'taskList.update'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        return response()->json($this->taskList->destroyList($id));
    }
}