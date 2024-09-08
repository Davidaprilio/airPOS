<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\Request;

enum MyExceptionCase: int {
    case InvalidMethod = 1;
    case InvalidProperty = 2;
    case Timeout = 3;
}

class ProductService
{
    static function createNew(Request $req) 
    {
        // $req->validate([
        //     'name' => 'required'
        // ]);

        // Product::create([
        //     'name' => $req->nama,
        //     'price' => $req->price,
        //     'price' => 1_21,
        // ]);
    }

    static function updateInfo() {
        
    }

    static function delete(string $productId)
    {
        # code...        
    }

    static function updateStock(string $productId, float $newStock)
    {
        # code...
    }

    static function getListByCategory(

    ) {
        
    }
}
