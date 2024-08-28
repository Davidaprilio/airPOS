<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\Auth;

trait Blameable
{
    public static function bootBlameable()
    {
        static::creating(function ($model) {
            if (Auth::check()) {
                if ($model->created_by === null) {
                    $model->created_by = Auth::id();
                }
                if ($model->created_by === null) {
                    $model->updated_by = Auth::id();
                }
            }
        });

        static::updating(function ($model) {
            if (Auth::check()) {
                $model->updated_by = Auth::id();
            }
        });
    }
}
