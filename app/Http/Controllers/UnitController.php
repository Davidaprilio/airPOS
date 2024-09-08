<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaginateRequest;
use App\Services\UnitService;

class UnitController extends Controller
{
    public function index(PaginateRequest $request)
    {
        $units = UnitService::getList($request);

        return inertia('Dash/Unit/List', [
            'units' => $units
        ]);
    }
}
