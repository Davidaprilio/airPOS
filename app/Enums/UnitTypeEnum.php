<?php

namespace App\Enums;

enum UnitTypeEnum: int
{
    case PIECE = 0;
    case MASS = 1;
    case VOLUME = 2;
    case LENGTH = 3;
}