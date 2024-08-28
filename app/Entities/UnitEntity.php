<?php

namespace App\Entities;

class UnitEntity
{
    public function __construct(
        public int $id, 
        public string $symbol, 
        public string $name, 
        public float $conversion_factor,  
        public int $type,  
        public ?int $parent_id = null,  
    ){}
}
