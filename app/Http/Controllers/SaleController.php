<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function index() {

        $sales = Sale::latest()->get();

        return response()->json([
            'sales' => $sales,
        ]);

    }
}
