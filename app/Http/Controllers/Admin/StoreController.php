<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Dash/Store/List');
    }

    public function create(Request $request)
    {
        return inertia('Dash/Store/Create');
    }
}
