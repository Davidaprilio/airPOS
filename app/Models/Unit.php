<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\Blameable;

class Unit extends Model
{
    use HasFactory;
    use Blameable;

    const TYPE_PIECE = 0;
    const TYPE_MASS = 1;
    const TYPE_VOLUME = 2;
    const TYPE_LENGTH = 3;

    protected $guarded = ['id'];

}
