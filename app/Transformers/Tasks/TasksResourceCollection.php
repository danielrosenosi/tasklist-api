<?php

namespace App\Transformers\Tasks;

use Illuminate\Http\Resources\Json\ResourceCollection;

use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;

class TasksResourceCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
        ];
    }

    public function with($request)
    {
        return [
            'status' => true,
            'message' => 'Listando dados',
            'url' => route('tasks.index'),
        ];
    }

    public function withResponse($request, $response)
    {
        $response->setStatusCode(200);
    }
}