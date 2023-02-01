<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProductRequest;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

use function Psy\debug;

class ProductApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->input('limit');

        $products = Products::paginate($limit);

        return response()->json([
            'data' => $products->items(),
            'total_page' => $products->lastPage(),
            'message' => 'Data Retrieved Successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CreateProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateProductRequest $request)
    {
        $input = $request->all();
        $input['web_id'] = Str::uuid()->toString();
        return response()->json(['data' => Products::create($input)], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function show(Products $products)
    {
        //
    }

    public function showById($id)
    {
        Log::info("id = ".$id);
        $product = DB::table('products')
                        ->where('web_id', $id)
                        ->get();

        Log::debug("Product = ".$product);
        return response()->json([
            'data' => $product,
            'message' => 'Data Retrieved Successfully'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Products $products)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy(Products $products)
    {
        //
    }
}
