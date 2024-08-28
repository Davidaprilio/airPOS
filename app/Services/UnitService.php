<?php

namespace App\Services;

use App\Exceptions\ClientError;
use App\Repositories\UnitRepo;

class UnitService
{
    static function convert(string $fromUnit, string $toUnit, float $value) {
        $unitFrom = UnitRepo::getUnitBySymbol($fromUnit);
        $unitTo = UnitRepo::getUnitBySymbol($toUnit);
        if ($unitFrom->type !== $unitTo->type) {
            throw ClientError::throw("different type unit conversion, unit type should be same");
        }

        $baseValue = $value * $unitFrom->conversion_factor;
        return round($baseValue / $unitTo->conversion_factor, 7);
    }
}
