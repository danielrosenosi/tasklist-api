<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class TaskListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => 1,
            'user_id' => 1,
            'title' => 'Primeira lista de tarefas',
            'status' => 'completed',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
