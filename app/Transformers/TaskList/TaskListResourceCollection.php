<?php

namespace App\Transformers\TaskList;

use Illuminate\Http\Resources\Json\ResourceCollection;

use App\Services\ResponseService;
use Illuminate\Http\Request;

class TaskListResourceCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return ['data' => $this->collection];
    }

    public function with($request)
    {
        return [
            'status' => true,
            'message' => 'Listando dados',
            'url' => route('taskList.index')
        ];
    }

    public function withResponse($request, $response)
    {
        $response->setStatusCode(200);
    }

}