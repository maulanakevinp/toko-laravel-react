import React, { Component } from 'react';
import Axios from 'axios';

class TambahProduk extends Component {

    constructor(props){
        super(props);
        this.state = {
            nama_produk : '',
            deskripsi   : '',
            harga       : '',
            stok        : '',
            err         : {}
        };

        this.handlerChange = this.handlerChange.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    handlerChange(event) {
        this.setState({[event.target.name] : event.target.value});
        if (event.target.value == "") {
            event.target.classList.add("is-invalid");
        } else {
            event.target.classList.remove("is-invalid");
        }
    }

    async handlerSubmit(event) {
        event.preventDefault();
        await Axios({
            url: "/api/product",
            method: "POST",
            data: this.state,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            responseType:'json'
        }).then(response => {
            if (response.data.success) {
                if (confirm(response.data.message + ". Apakah anda ingin menambahkan produk lagi ?")) {
                    document.querySelector("form").reset();
                } else {
                    this.props.history.push('/');
                }
            }
        }).catch(error => {
            let err = {};
            const errors = error.response.data.errors;
            for(let key in errors) {
                document.querySelector(`[name="${key}"]`).classList.add("is-invalid");
                err[key] = errors[key];
            }
            this.setState({err});
        });
    }

    render() {
        const {err} = this.state;
        return (
            <div className="container mt-5">
                <h2>Tambah Produk</h2>
                <form className="mt-5" onSubmit={this.handlerSubmit}>
                    <div className="form-group">
                        <label>Nama Produk</label>
                        <input className="form-control" placeholder="Masukkan Nama Produk ..." onChange={this.handlerChange} type="text" name="nama_produk" id="nama_produk"/>
                        <span className="invalid-feedback">{err.nama_produk}</span>
                    </div>
                    <div className="form-group">
                        <label>Deskripsi</label>
                        <input className="form-control" placeholder="Masukkan Deskripsi ..." onChange={this.handlerChange} type="text" name="deskripsi" id="deskripsi"/>
                        <span className="invalid-feedback">{err.deskripsi}</span>
                    </div>
                    <div className="form-group">
                        <label>Harga</label>
                        <input className="form-control" placeholder="Masukkan Harga ..." onChange={this.handlerChange} type="number" name="harga" id="harga"/>
                        <span className="invalid-feedback">{err.harga}</span>
                    </div>
                    <div className="form-group">
                        <label>Stok</label>
                        <input className="form-control" placeholder="Masukkan Stok ..." onChange={this.handlerChange} type="number" name="stok" id="stok"/>
                        <span className="invalid-feedback">{err.stok}</span>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Save</button>
                </form>
            </div>
        );
    }
}

export default TambahProduk;
