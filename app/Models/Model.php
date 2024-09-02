<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model as BaseModel;

/**
 * @method static \Illuminate\Database\Eloquent\Builder search(array $columns, string $keyword)
 */
abstract class Model extends BaseModel
{
    use HasFactory;

    function scopeSearch(Builder $query, array $columns, string $keyword): void
    {
        $query->whereAny($columns, 'LIKE', $keyword);
    }
}
