<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() {

        return CategoryResource::collection(
            Category::latest()->get());
    }

    public function store(Request $request) {

        $data = $request->validate([
            'name' => 'required',
        ]);

        $category = Category::create($data);

        return response()->json([
            'message' => 'Category created Successfully',
            'category' => new CategoryResource($category),
        ]);
    }

    public function edit(Category $category) {

        return new CategoryResource($category);
    }

    public function update(Category $category, Request $request) {

        $data = $request->validate([
            'name' => 'required',
        ]);

        $category->update($data);
        $category->save();

        return response()->json([
            'message' => 'Category Updated Successfully',
            'category' => new CategoryResource($category),
        ]);
    }

    public function destroy(Category $category) {

        $category->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);


    }
}
