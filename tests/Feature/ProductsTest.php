<?php

use Tests\TestCase;
use Faker\Factory as Faker;

class ProductsTest extends TestCase
{
    /** @test */
    public function it_can_create_a_products()
    {
        $faker = Faker::create();
        $data = [
            'product_title' => $faker->title(),
            'image_url' => $faker->url(),
            'price' => $faker->randomFloat(2, 0, 3),
            'rating' => $faker->randomFloat(1, 0, 1),
            'category' => $faker->name(),
            'is_deleted' => false
        ];

        $this->post(route('products.store'), $data)
            ->dump()
            ->assertStatus(201)
            ->assertJson(compact('data'));
    }
}
