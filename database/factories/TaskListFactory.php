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
            'id' => 3,
            'user_id' => 3,
            'title' => 'This is my third task list',
            'status' => 'completed',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
