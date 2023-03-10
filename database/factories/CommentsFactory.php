<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comments>
 */
class CommentsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'username' => fake()->firstName(),
            'web_id' => '5bc821ef-dc5a-4478-8bdc-b57b7c6ad2ab',
            'comment' => fake()->paragraph(),
            'is_deleted' => false
        ];
    }
}
