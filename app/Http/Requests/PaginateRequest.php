<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaginateRequest extends FormRequest
{
    protected $default_limit = 15;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'limit' => 'numeric|nullable'
        ];
    }

    public function getLimit(): int
    {
        $limit =  $this->query('limit', null);
        if ($limit === '0') return 9_999_999;
        if ($limit === null) return $this->default_limit;
        return $limit;
    }

    function getSearch(): ?string 
    {
        return $this->query('search', null);
    }
}
