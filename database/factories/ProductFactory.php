<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'nama_produk'   => $faker->sentence(3,true),
        'deskripsi'     => $faker->paragraph,
        'harga'         => rand(10000,1000000),
        'stok'          => rand(1,100)
    ];
});
