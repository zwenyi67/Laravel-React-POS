<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function add(Request $request) {
        
        $data = $request->validate([
            'barcode' => 'required',
            'quantity' => 'required'
        ]);

        $product = Product::where('barcode', $data['barcode'])->first();

        if (!$product) {
            return response()->json([
                'error' => 'Product not found for the provided barcode.',
            ], 404);
        }

        return response()->json([
            'message' => 'Product added successfully',
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
            'quantity' => $data['quantity'],
            ]
        ]);
    }


    public function receipt($id) {

        $sale = Sale::findOrFail($id);

        $products = [];

        foreach ($sale->products as $product) {
            $products[] = [
                'product_id' => $product->id,
                'barcode' => $product->barcode,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $product->pivot->quantity,
            ];
        }

        return response()->json([
            'id' => $sale->id,
            'products' => $products,
        ]); 
    }
    

        /* 
        }*/

        public function confirm(Request $request) {
            

            $jsonProducts = $request->getContent();

            $products = json_decode($jsonProducts, true);

            /* if(empty($products)) {
                return response()->json(['message' => 'products are empty array'], 200);
            } else {
                return response()->json(['message' => 'dude it works'], 200);
            } */

            $sale = Sale::create([
                'total' => 3453,
            ]);

            if(!empty($products) && is_array($products)) {
                    foreach($products as $product) {
                        $sale->products()->attach($product['id'], ['quantity' => $product['quantity']]);
                    }
            }

            return response()->json([
                'message' => 'Sale confirmed successfully',
                'id' => $sale->id,
        ]);
        }
        


}
