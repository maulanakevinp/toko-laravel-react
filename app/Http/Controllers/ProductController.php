<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::orderBy('id', 'desc')->paginate(9);
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_produk'   => ['required','string','max:191'],
            'deskripsi'     => ['required','string'],
            'harga'         => ['required','numeric','min:1000'],
            'stok'          => ['required','numeric','min:0'],
        ]);

        $product = Product::create($data);

        return response()->json([
            'success'   => true,
            'message'   => 'Produk berhasil ditambahkan',
            'data'      => $product
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'nama_produk'   => ['required','string','max:191'],
            'deskripsi'     => ['required','string'],
            'harga'         => ['required','numeric','min:1000'],
            'stok'          => ['required','numeric','min:0'],
        ]);

        $product->update($data);

        return response()->json([
            'success'   => true,
            'message'   => 'Produk berhasil diperbarui',
            'data'      => $product
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([
            'success'   => true,
            'message'   => 'Produk berhasil dihapus',
        ]);
    }
}
