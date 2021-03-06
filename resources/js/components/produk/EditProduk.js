import React, { Component } from 'react';
import Axios from 'axios';

class EditProduk extends Component {
    constructor(props){
        super(props);
        this.state = {
            id          : '',
            nama_produk : '',
            deskripsi   : '',
            harga       : '',
            stok        : '',
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    handlerChange(event) {
        this.setState({[event.target.name] : event.target.value});

        const isInvalid = document.querySelector(`#${event.target.id}`);
        for(let invalid of isInvalid.parentElement.children) {
            if (invalid.className == "invalid-feedback") {
                invalid.innerHTML = "";
            }
        }

        if (event.target.value == "") {
            event.target.classList.add("is-invalid");
        } else {
            event.target.classList.remove("is-invalid");
        }
    }

    async handlerSubmit(event) {
        event.preventDefault();
        await Axios({
            url: "/api/product/" + this.state.id,
            method: "put",
            data: this.state,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization   : "Bearer " + localStorage.getItem('token')
            },
            responseType:'json'
        }).then(response => {
            if (response.data.success) {
                alert(response.data.message);
            }
        }).catch(error => {
            console.clear();
            const errors = error.response.data.errors;
            for(let key in errors) {
                const isInvalid = document.querySelector(`[name="${key}"]`);
                isInvalid.classList.add("is-invalid");
                for(let invalid of isInvalid.parentElement.children) {
                    if (invalid.className == "invalid-feedback") {
                        invalid.innerHTML = errors[key];
                    }
                }
            }
        });
    }

    async componentDidMount () {
        await Axios({
            url     : "/api/product/" + this.props.match.params.id,
            method  : "get",
            headers: {
                "Content-Type"  : "application/json",
                Accept          : "application/json",
                Authorization   : "Bearer " + localStorage.getItem("token"),
            }
        }).then(response => {
            this.setState({
                id          : response.data.id,
                nama_produk : response.data.nama_produk,
                deskripsi   : response.data.deskripsi,
                harga       : response.data.harga,
                stok        : response.data.stok,
            });
        }).catch(error => alert("ERROR : "+error));
    }

    render() {
        const {nama_produk, deskripsi, harga, stok} = this.state;
        return (
            <div className="container">
                <h2>Edit Produk</h2>
                <form className="mt-5" onSubmit={this.handlerSubmit}>
                    <div className="form-group">
                        <label>Nama Produk</label>
                        <input className="form-control" onChange={this.handlerChange} type="text" name="nama_produk" id="nama_produk" value={nama_produk}/>
                        <span className="invalid-feedback"></span>
                    </div>
                    <div className="form-group">
                        <label>Harga</label>
                        <input className="form-control" onChange={this.handlerChange} type="number" name="harga" id="harga" value={harga}/>
                        <span className="invalid-feedback"></span>
                    </div>
                    <div className="form-group">
                        <label>Stok</label>
                        <input className="form-control" onChange={this.handlerChange} type="number" name="stok" id="stok" value={stok}/>
                        <span className="invalid-feedback"></span>
                    </div>
                    <div className="form-group">
                        <label>Deskripsi</label>
                        <textarea className="form-control" onChange={this.handlerChange} type="text" name="deskripsi" id="deskripsi" value={deskripsi}/>
                        <span className="invalid-feedback"></span>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Save</button>
                </form>
            </div>
        )
    }
}

export default EditProduk;
