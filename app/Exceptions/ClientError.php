<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClientError extends Exception
{
    public function __construct(
        string $message, 
        protected array $errors = [], 
        protected ?string $clientMsg = null, 
        protected int $statusCode = 400, 
    ) {
        $this->message = $message;
    }

    function getStatusCode() {
        return $this->statusCode;
    }

    function getClientMsg() {
        return $this->clientMsg;
    }

    /**
     * Report the exception.
     */
    public function report(): void
    {
        //
    }

    /**
     * Render the exception as an HTTP response.
     */
    public function render(Request $request)
    {
        $class_names = explode('\\',get_class($this));
        return response()->json(
            data: [
                'error' => array_pop($class_names),
                'message' => $this->message,
                'client_msg' => $this->clientMsg,
                'errors' => $this->clientMsg,
            ],
            status: $this->statusCode,
        );
    }

    static function throw(
        string $message, 
        array $errors = [], 
        ?string $clientMsg = null, 
        ?int $statusCode = null 
    ) {
        if ($statusCode === null) {
            throw new self($message, $errors, $clientMsg);
        }
        throw new self($message, $errors, $clientMsg);
    }
}
