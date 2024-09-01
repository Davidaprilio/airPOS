<?php

namespace App\Entities\Units;

class ListItem
{
    public function __construct(
        public int $id,
        public string $name,
        public string $symbol,
        public int $parent,
        public float $conversion_factor,
    ) {}

    function toArray(): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'symbol' => $this->symbol,
            'symbol' => $this->symbol,
        ];
    }
}
