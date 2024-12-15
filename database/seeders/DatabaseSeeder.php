<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $now = now();

        $this->call(
            RolePermissionSeeder::class,
            UnitSeeder::class,
        );

        $password = Hash::make('password');
        // User::factory(10)->create();
        User::create([
            'name' => 'SuperAdmin',
            'email' => 'admin@example.com',
            'email_verified_at' => $now,
            'password' => $password,
        ]);
        
        $owner = User::create([
            'name' => 'Jhon Doe',
            'email' => 'jhon@example.com',
            'email_verified_at' => $now,
            'password' => $password,
        ]);

        $cashier = User::create([
            'name' => 'Cashier1',
            'email' => 'cashier@example.com',
            'email_verified_at' => $now,
            'password' => $password,
        ]);

        $owner->assignRole('busines-owner');
        $cashier->assignRole('cashier');
    }
}
