import React, { Component } from 'react';
import CardProduk from './CardProduk';

class DaftarProduk extends Component {

    constructor(props){
        super(props);
        this.state = {
            produk : []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount(){
        await fetch("/api/product",{
            method: "get"
        }).then(response => {
            return response.json()
        }).then(response => {
            this.setState({produk: response.data});
        }).catch(error => alert(error));
    }

    render() {

        const renderProduk = this.state.produk.map(produk => {
            return <CardProduk produk={produk} key={produk.id} refresh={this.componentDidMount} />;
        });

        return (
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    {renderProduk}
                </div>
            </div>
        );
    }
}

export default DaftarProduk;
