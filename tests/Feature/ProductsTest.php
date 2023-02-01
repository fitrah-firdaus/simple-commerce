<?php

use App\Models\Products;
use Tests\TestCase;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Log;

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

    private function generateProductPerPage(int $page, int $perPage, $products)
    {
        $result = [];
        $count = 0;
        for ($i = ($perPage * $page - $perPage); $i < ($perPage * $page); $i++) {
            $result[$count]["id"] = $i + 1;
            $result[$count]["product_title"] = $products[$i]["product_title"];
            $result[$count]["image_url"] = $products[$i]["image_url"];
            $result[$count]["price"] = $products[$i]["price"];
            $result[$count]["web_id"] = $products[$i]["web_id"];
            $result[$count]["rating"] = $products[$i]["rating"];
            $result[$count]["category"] = $products[$i]["category"];
            $result[$count]["is_deleted"] = $products[$i]["is_deleted"];
            $count++;
        }
        return $result;
    }

    public function testRetrieveProduct()
    {
        $products = Products::factory()->count(30)->create();

        $productFirst10 = $this->generateProductPerPage(1, 10, $products);

        $this->json('GET', '/api/v1/products?limit=10&page=1', ['Accept' => 'application/json'])
            ->dump()
            ->assertStatus(200)
            ->assertJson([
                "data" => $productFirst10,
                "total_page" => 3,
                "message" => "Data Retrieved Successfully"
            ]);

        $productSecond10 = $this->generateProductPerPage(2, 10, $products);
        $this->json('GET', '/api/v1/products?limit=10&page=2', ['Accept' => 'application/json'])
            ->dump()
            ->assertStatus(200)
            ->assertJson([
                "data" => $productSecond10,
                "total_page" => 3,
                "message" => "Data Retrieved Successfully"
            ]);

        $productThird10 = $this->generateProductPerPage(3, 10, $products);
        $this->json('GET', '/api/v1/products?limit=10&page=3', ['Accept' => 'application/json'])
            ->dump()
            ->assertStatus(200)
            ->assertJson([
                "data" => $productThird10,
                "total_page" => 3,
                "message" => "Data Retrieved Successfully"
            ]);
    }
}
