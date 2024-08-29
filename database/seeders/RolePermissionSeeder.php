<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Exceptions\PermissionAlreadyExists;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'user.create',
            'user.delete',
            'user.update',
            'user.view',

            'profile.update',

            'create-product',
            'delete-product',
            'update-product',
            'update:stock-product',
            'update:name-product',

            'create-busines',
            'delete-busines',
            'update-busines',
            'view-busines',

            'create-store',
            'delete-store',
            'update-store',
            'view-store',
        ];

        DB::beginTransaction();
        foreach ($permissions as $permission) {
            try {
                Permission::create(['name' => $permission]);
            } catch (\Throwable $th) {
                if (!($th instanceof PermissionAlreadyExists)) {
                    throw $th;
                }
            }
        }
        DB::commit();

        $buOwner = Role::create([
            'display_name' => 'Super Admin',
            'name' => 'root',
            'editable' => false
        ]);

        $buOwner = Role::create([
            'display_name' => 'Busines Owner',
            'name' => 'busines-owner',
            'editable' => false
        ]);

        $cashier = Role::create([
            'display_name' => 'Cashier',
            'name' => 'cashier',
            'editable' => false
        ]);

        $buOwner->givePermissionTo('create-busines','delete-busines','update-busines','view-busines','create-store','delete-store','update-store','view-store');
        $cashier->givePermissionTo('create-product','delete-product','update-product');

    }
}
