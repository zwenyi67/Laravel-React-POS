<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() {

        return ProductResource::collection(
            Product::latest()->get()
        );
    }

    public function create() {
        return CategoryResource::collection(
            Category::latest()->get()
        );
    }

    public function store(Request $request) {
        $data = $request->validate([
            'barcode' => 'required',
            'name' => 'required',
            'category_id' => 'required',
            'price' => 'required',
            'stock' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'description' => 'required',
        ]);
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $request->name . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $imageName);
            $data['image'] = $imageName;
        } else {
            return response()->json(['error' => 'Image file not provided'], 400);
        }
    
        $product = Product::create($data);
    
        return response()->json([
            'message' => 'Product created successfully',
            'product' => new ProductResource($product)
        ]);  
    }
    

     public function edit(Product $product) {

        $product = Product::with('category')->findOrFail($product->id);
    
        return response()->json([
            'categories' => CategoryResource::collection(
                Category::where('id', '<>', $product->category_id)->get()
            ),
            'product' => [
            'id' => $product->id,
            'barcode' => $product->barcode,
            'name' => $product->name,
            'category_id' => $product->category_id,
            'image' => $product->image,
            'price' => $product->price,
            'stock' => $product->stock,
            'description' => $product->description,
            'category' => $product->category,
            ]
        ]);
    }
    
    

    public function update(Request $request, Product $product) {

        $data = $request->validate([
            'barcode' => 'required',
            'name' => 'required',
            'category_id' => 'required',
            'price' => 'required',
            'stock' => 'required',
            'description' => 'required',
        ]);

        $product->update($data);
        $product->save();

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => new ProductResource($product)
        ]);
    }

    public function imageUpdate(Request $request, Product $product) {
        $data = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $request->name . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $imageName);
            $data['image'] = $imageName;
        } else {
            return response()->json(['error' => 'Image file not provided'], 400);
        }

        $product->update([
            'image' => $data['image'],
        ]);

        $product->save();

        return response()->json([
            'image' => $data['image'],
        ]);


    }

    public function destroy(Product $product) {
        $product->delete();

        //return response('', 204);

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
