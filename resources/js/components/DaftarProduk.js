import React, { Component } from 'react';
import CardProduk from './CardProduk';
import InfiniteScroll from 'react-infinite-scroller';
import CardProdukSkeleton from './CardProdukSkeleton';
import Axios from 'axios';

class DaftarProduk extends Component {

    constructor(props){
        super(props);
        this.state = {
            page    : 1,
            produk  : [],
            loadMore : true
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount(){
        await Axios({
            url: "/api/product?page="+this.state.page,
            method: "get"
        }).then(response => {
            console.log(response.data);
            if (response.data.next_page_url === null) {
                this.setState({
                    loadMore: false
                });
            }

            this.setState({
                page    : this.state.page + 1,
                produk  : [...this.state.produk, ...response.data.data]
            });
        }).catch(error => alert(error));
    }

    render() {

        const renderProduk = this.state.produk.map(produk => {
            return <CardProduk produk={produk} key={produk.id} refresh={this.componentDidMount} />;
        });

        return (
            <div className="container">
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={this.componentDidMount}
                    hasMore={this.state.loadMore}
                    loader={(
                      <CardProdukSkeleton key={0}/>
                    )}
                    className="row mt-5 justify-content-center"
                >
                    {renderProduk}
                </InfiniteScroll>
            </div>
        );
    }
}

export default DaftarProduk;
