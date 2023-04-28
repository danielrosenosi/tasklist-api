<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'status',
    ];

    public function index()
    {
        $taskLists = auth()->user()->taskList()->get();
        $tasks = auth()->user()->tasks()->get()->groupBy('list_id');

        $taskLists->map(function($taskList) use ($tasks) {
            $taskList->tasks = $tasks[$taskList->id] ?? [];
        });

        return $taskLists;
    }

    public function create($fields)
    {
        return auth()->user()->taskList()->create($fields);
    }

    public function show($id)
    {
        $show = auth()->user()->taskList()->find($id);

        if(!$show) {
            throw new \Exception('Nada foi encontrado!', 404);
        }

        return $show;
    }

    public function updateList($fields, $id)
    { 
        $taskList = $this->show($id);

        $taskList->update($fields);

        return $taskList;
    }

    public function destroyList($id)
    {
        $taskList = $this->show($id);

        auth()->user()->tasks()->where('list_id', $id)->get()->map(function($task) {
            $task->delete();
        });

        return $taskList->delete();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tasks()
    {
        return $this->hasMany(Tasks::class, 'user_id', 'user_id', 'list_id', 'id');
    }
}
