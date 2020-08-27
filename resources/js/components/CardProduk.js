import React from 'react';
import {Link} from 'react-router-dom';

function CardProduk({produk, refresh}) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });

    async function deleteProduk(){
        if (confirm("Apakah anda yakin ingin menghapus produk " + produk.nama_produk + " ini???")) {
            await fetch("/api/product/" + produk.id, {
                method: 'delete'
            }).then(response => response.json())
            .then(response => {
                return refresh();
            })
        }
    }

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow h-100">
                <div className="card-body">
                    <h3>{produk.nama_produk}</h3>
                    <small>{produk.deskripsi}</small>
                    <p className="">Stok : {produk.stok}</p>
                    <div className="row">
                        <div className="col-5">
                            <Link to={"/edit-produk/"+produk.id} className="btn btn-sm btn-success">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </Link>
                            <button className="btn btn-sm btn-danger ml-2" onClick={deleteProduk}>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="col-7 text-right">
                            <p className="mb-0">{formatter.format(produk.harga)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProduk
