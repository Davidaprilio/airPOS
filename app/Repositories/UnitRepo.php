<?php

namespace App\Repositories;

use App\Entities\UnitEntity;
use App\Exceptions\ResourceNotFoundError;
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
}
