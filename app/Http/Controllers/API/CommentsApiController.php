<?php

namespace App\Http\Controllers\API;

use App\Models\Comments;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCommentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CommentsApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->input('limit');
        $webId = $request->input('web_id');

        $comments = Comments::where("is_deleted", false);
        $comments->where("web_id", $webId);

        $comments = $comments->paginate($limit);

        return response()->json([
            'data' => $comments->items(),
            'total_page' => $comments->lastPage(),
            'message' => 'Data Retrieved Successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCommentRequest $request)
    {
        $input = $request->all();
        return response()->json(
            [
                'data' => Comments::create($input)
            ],
            201
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comments = DB::table('comments')
            ->where('id', $id)
            ->get();
        return response()->json([
            'data' => $comments,
            'message' => 'Data Retrieved Successfully'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $comment = Comments::where('id', $id);

        $updated = [];

        if (!empty($request->input('comment'))) {
            $updated['comment'] = $request->input('comment');
        }

        Log::info("Update Data" . serialize($updated));
        $comment->update($updated);

        return response()->json([], 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comments $comments)
    {
        //
    }
}
