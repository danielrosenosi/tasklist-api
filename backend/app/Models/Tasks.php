<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;

    protected $fillable = [
        'list_id',
        'user_id',
        'title',
        'status',
    ];

    public function index()
    {
        return auth()->user()->tasks;
    }

    public function store($fields)
    {
        $list = auth()->user()->taskList()->find($fields['list_id']);

        if(!$list) {
            throw new \Exception('Lista não encontrada', -404);
        }

        if($list['user_id'] != auth()->user()->id) {
            throw new \Exception('Você não tem permissão para adicionar tarefas nessa lista', -403);
        }

        $list->update(['status' => 0]);

        return $list->tasks()->create($fields);
    }

    public function show($id)
    {
        $show = auth()->user()->tasks()->find($id);

        if(!$show) {
            throw new \Exception('Nada encontrado', -404);
        }

        return $show;
    }
    
    public function tasksByList($listId)
    {
        $tasks = auth()
            ->user()
            ->tasks()
            ->where('list_id', '=', $listId)
            ->get();

        return $tasks;
    }

    public function closeTask($id){
        $task = $this->show($id);
        $task->update(['status' => 1]);
        
        $list = Auth()
        ->user()
        ->taskList()->find($task['list_id']);

        $taskOpen = Auth()
        ->user()
        ->tasks()
        ->where('list_id', '=', $task['list_id'])
        ->where('status', 0)
        ->get();
        
        if(count($taskOpen) === 0){
            $list->update(['status' => 1]);
        }
        return $task;
    }

    public function updateTask($fields, $id)
    {
        $task = $this->show($id);

        $task->update($fields);

        return $task;
    }

    public function destroyTask($id)
    {
        $task = $this->show($id);
        $task->delete();

        $list = auth()
            ->user()
            ->taskList()
            ->find($task['list_id']);

        $taskOpen = auth()
            ->user()
            ->tasks()
            ->where('list_id', '=', $task['list_id'])
            ->where('status', 0)
            ->get();
        
        if(count($taskOpen) === 0) {
            $list->update(['status' => 1]);
        }

        return $task;
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function taskList()
    {
        return $this->belongsTo(User::class, 'list_id', 'id');
    }
}
