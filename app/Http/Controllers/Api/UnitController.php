<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Services\UnitService;

class UnitController extends Controller
{
    public function getListPaginate(PaginateRequest $request)
    {
        $unitPaginated = UnitService::getList($request);

        return response()->json($unitPaginated);
    }
}
