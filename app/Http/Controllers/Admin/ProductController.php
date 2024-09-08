<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Dash/Product/List');
    }
    
    public function create(Request $request)
    {
        return inertia('Dash/Product/Create');
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'sku' => 'required',
            'upc' => 'numeric',
        ]);

        return $request->all();
    }

    public function createProduct(Request $request)
    {
        ProductService::createNew($request);
    }
}
