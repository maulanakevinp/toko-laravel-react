<?php

use App\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::unguard();
        Product::truncate();
        factory(Product::class,30)->create();
        Product::reguard();
    }
}
