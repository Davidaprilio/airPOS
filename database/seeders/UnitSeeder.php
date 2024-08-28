<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user_id = 1;

        $dictionary = [
            Unit::TYPE_PIECE => [
                ['pcs', 'Piece', 1], // piece
                ['doz', 'Dozen', 12], // lusin
                ['gro', 'Gross', 144], // rem
                ['ggro', 'Great Gross', 1_728], // rem
            ],
            Unit::TYPE_MASS => [
                ['g', 'Gram', 1],
                ['oz', 'Ounces', 28.3495],
                ['kg', 'Kilogram', 1_000.0],
                ['mg', 'Miligram', 0.001],
                ['µg', 'Microgram', 0.000001],
                ['lb', 'Pound', 453.592],
                ['q', 'Kuintal', 100_000.0],
                ['t', 'Ton', 1_000_000.0],
            ],
            Unit::TYPE_VOLUME => [
                ['m', 'Meter', 1],
                ['km', 'Kilometer', 1_000],
                ['cm', 'Centimeter', 0.01],
                ['mm', 'Milimeter', 0.001],
                ['in', 'Inch', 0.0254],
            ],
            Unit::TYPE_LENGTH => [
                ['L', 'Liter', 1],
                ['mL', 'Mililiter', 0.001],
                ['m³', 'Cubic Meter', 1_000],
                ['cm³', 'Cubic Centimeter', 0.001],
                ['mm³', 'Cubic Milimeter', 0.000001],
                ['in³', 'Cubic Inch', 0.0163871	],
            ],
        ];

        DB::beginTransaction();
        foreach ($dictionary as $type => $units) {
            $parent_id = null;
            foreach ($units as $index => $unit) {
                [$symbol, $name, $conversion_factor] = $unit;
                $unit = Unit::create([
                    'is_universal' => true, 
                    'symbol' => $symbol,
                    'name' => $name,
                    'type' => $type,
                    'parent_unit_id' => $parent_id,
                    'conversion_factor' => $conversion_factor,
                    'created_by' => $user_id,
                    'updated_by' => $user_id,
                ]);
                if ($index == 0) {
                    $parent_id = $unit->id;
                }
            }
        }
        DB::commit();
    }
}
