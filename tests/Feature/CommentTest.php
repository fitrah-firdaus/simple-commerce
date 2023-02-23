<?php

namespace Tests\Feature;

use Tests\TestCase;
use Faker\Factory as Faker;
use Illuminate\Support\Str;
use App\Models\Comments;

define("ACCEPT_MIME_TYPE", "application/json");
define("DEFAULT_MESSAGE", "Data Retrieved Successfully");
define("COMMENT_URL", "/api/v1/comments");

class CommentTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testCreateComment() {
        $faker = Faker::create();
        $data = [
            'username' => $faker->firstName(),
            'web_id' => Str::uuid()->toString(),
            'comment' => $faker->paragraph()
        ];

        $this->json('POST', COMMENT_URL, $data, ['Accept' => ACCEPT_MIME_TYPE])
            ->dump()
            ->assertStatus(201);
    }

    private function generateCommentsPerPage(int $page, int $perPage, $comments) {
        $result = [];
        $count = 0;
        for ($i = ($perPage * $page - $perPage); $i < ($perPage * $page); $i++) {
            $result[$count]["id"] = $i + 1;
            $result[$count]["web_id"] = $comments[$i]["web_id"];
            $result[$count]["username"] = $comments[$i]["username"];
            $result[$count]["comment"] = $comments[$i]["comment"];
            $result[$count]["is_deleted"] = $comments[$i]["is_deleted"];
            $count++;
        }

        return $result;
    }

    public function testRetrieveComments() {
        $comments = Comments::factory()->count(30)->create();

        $commentsFirst10 = $this->generateCommentsPerPage(1, 10, $comments);
        $this->json('GET', COMMENT_URL.'?limit=10&page=1', ['Accept' => ACCEPT_MIME_TYPE])
            ->dump()
            ->assertStatus(200)
            ->assertJson([
                "data" => $commentsFirst10,
                "total_page" => 3,
                "message" => DEFAULT_MESSAGE
            ]);

        $commentsSecond10 = $this->generateCommentsPerPage(2, 10, $comments);
        $this->json('GET', COMMENT_URL.'?limit=10&page=2', ['Accept' => ACCEPT_MIME_TYPE])
            ->dump()
            ->assertStatus(200)
            ->assertJson([
                "data" => $commentsSecond10,
                "total_page" => 3,
                "message" => DEFAULT_MESSAGE
            ]);

       $commentsThird10 = $this->generateCommentsPerPage(3, 10, $comments);
        $this->json('GET', COMMENT_URL.'?limit=10&page=3', ['Accept' => ACCEPT_MIME_TYPE])
            ->dump()
            ->assertStatus(200)
            ->assertJson([
                "data" => $commentsThird10,
                "total_page" => 3,
                "message" => DEFAULT_MESSAGE
            ]);
    }

    public function testShowCommentById() {
        $comments = Comments::factory()->count(15)->create();

        $expected['id'] = 1;
        $expected['web_id'] = $comments[0]['web_id'];
        $expected['is_deleted'] = $comments[0]['is_deleted'];
        $expected['username'] = $comments[0]['username'];

        $this->json('GET', COMMENT_URL . "/1", ['Accept' => ACCEPT_MIME_TYPE])
            ->dump()
            ->assertStatus(200)
            ->assertJson([
                "data" => [$expected],
                "message" => "Data Retrieved Successfully"
            ]);
    }

    public function testUpdateComments() {
        $comments = Comments::factory()->count(20)->create();

        $id = 6;
        $data = [
            'comment' => 'Update Comment'
        ];

        $this->put(COMMENT_URL . "/" . $id, $data)
            ->assertStatus(204);

        $expected['id'] = 6;
        $expected['web_id'] = $comments[5]['web_id'];
        $expected['comment'] = $data['comment'];
        $expected['username'] = $comments[5]['username'];
        $expected['is_deleted'] = $comments[5]['is_deleted'];

        $this->json('GET', COMMENT_URL . "/" . $id, ['Accept' => ACCEPT_MIME_TYPE])
            ->dump()
            ->assertStatus(200)
            ->assertJson([
                "data" => [$expected],
                "message" => DEFAULT_MESSAGE
            ]);
    }
}
