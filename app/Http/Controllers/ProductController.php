<?php

namespace App\Http\Controllers;

use App\Events\ProductEvent;
use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $products = Product::orderBy('id', 'desc')->paginate(9);

        if ($request->cari) {
            $products = Product::where(function ($products) use ($request) {
                $products->where('nama_produk','like',"%$request->cari%");
                $products->orWhere('harga','like',"%$request->cari%");
                $products->orWhere('stok','like',"%$request->cari%");
                $products->orWhere('deskripsi','like',"%$request->cari%");
            })->orderBy('id', 'desc')->paginate(9);
        }

        $products->appends($request->only('cari'));

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

        event(new ProductEvent("Berhasil memperbarui produk"));

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

        event(new ProductEvent("Berhasil memperbarui produk"));

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

        event(new ProductEvent("Berhasil menghapus produk"));

        return response()->json([
            'success'   => true,
            'message'   => 'Produk berhasil dihapus',
        ]);
    }
}
