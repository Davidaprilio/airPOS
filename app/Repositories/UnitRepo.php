<?php

namespace App\Repositories;

use App\Entities\UnitEntity;
use App\Enums\UnitTypeEnum;
use App\Exceptions\ResourceNotFoundError;
use App\Http\Requests\PaginateRequest;
use App\Models\Unit;

class UnitRepo
{
    static function getUnitById(int $unitId) {
        $unit = Unit::select([
            'id',
            'symbol',
            'name',
            'conversion_factor',
            'parent_unit_id',
            'id',
            'symbol',
            'type',
            'name',
            'conversion_factor',
            'parent_unit_id',
        ])->firstWhere('id', $unitId);

        if ($unit === null) {
            ResourceNotFoundError::throw('unit data not found');
        }

        return new UnitEntity(
            id: $unit->id,  
            symbol: $unit->symbol,
            name: $unit->name,
            type: $unit->type,
            conversion_factor: $unit->conversion_factor,
            parent_id: $unit->parent_unit_id, 
        );
    }

    static function getUnitBySymbol(string $unitSymbol) {
        $unit = Unit::select([
            'id',
            'symbol',
            'name',
            'conversion_factor',
            'parent_unit_id',
            'id',
            'symbol',
            'type',
            'name',
            'conversion_factor',
            'parent_unit_id',
        ])->firstWhere('symbol', $unitSymbol);

        if ($unit === null) {
            ResourceNotFoundError::throw('unit data not found');
        }

        return new UnitEntity(
            id: $unit->id,  
            symbol: $unit->symbol,
            name: $unit->name,
            type: $unit->type,
            conversion_factor: $unit->conversion_factor,
            parent_id: $unit->parent_unit_id, 
        );
    }

    static function getListPagination(
        PaginateRequest $req,
        int $busines_id = null
    ) {
        $units = Unit::with([
            'parent' => fn($qry) => $qry->select('name', 'id')
        ])->select([
            'id',
            'is_universal',
            'type',
            'name',
            'symbol',
            'parent_unit_id',
            'conversion_factor',
        ])->where(function($q) use ($busines_id) {
            $q->where('is_universal', true);
            $q->where('busines_id', $busines_id);
        })->paginate($req->getLimit());

        $units->setCollection(
            $units->getCollection()->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'is_universal' => $item->is_universal,
                    'symbol' => $item->symbol,
                    'type' => UnitTypeEnum::from($item->type)->name,
                    'parent' => $item->parent,
                    'conversion_factor' => $item->conversion_factor,
                ];
            })
        );

        return $units;
    }
}
