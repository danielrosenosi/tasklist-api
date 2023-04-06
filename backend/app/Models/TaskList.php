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
        return auth()->user()->TaskList()->sortBy('status');
    }

    public function create($fields)
    {
        return auth()->user()->TaskList()->create($fields);
    }

    public function show($id)
    {
        $show = auth()->user()->TaskList()->find($id);

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

        $taskList->delete();

        return $taskList;
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
