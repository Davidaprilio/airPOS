<?php

namespace App\Exceptions;

class ResourceNotFoundError extends ClientError
{
    public function __construct(
        string $message, 
        array $errors = [], 
        ?string $clientMsg = null, 
    ) {
        parent::__construct($message, $errors, $clientMsg, 404);
    }
}
