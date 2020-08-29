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
            loadMore: true,
            cari    : ''
        };

        this.componentDidMount  = this.componentDidMount.bind(this);
        this.handlerChange  = this.handlerChange.bind(this);
        this.handlerSubmit  = this.handlerSubmit.bind(this);
        this.refresh  = this.refresh.bind(this);
    }

    handlerChange(event){
        this.setState({
            cari: event.target.value,
            page: 1,
        });
    }

    handlerSubmit(event){
        event.preventDefault();

        this.setState({
            produk  : [],
            loadMore: true,
        });

        this.componentDidMount();
    }

    refresh(){
        this.setState({
            produk  : [],
            loadMore: true,
        });

        this.componentDidMount();
    }

    async componentDidMount(){
        await Axios({
            url: `/api/product?cari=${this.state.cari}&page=${this.state.page}`,
            method: "get",
            headers : {
                "Content-type"  : "application/json",
                Accept          : "application/json",
                Authorization   : "Bearer " + localStorage.getItem('token')
            },
        }).then(response => {
            if (response.data.next_page_url === null) {
                this.setState({
                    loadMore: false
                });
            } else {
                this.setState({
                    page    : this.state.page + 1,
                    loadMore: true,
                });
            }

            this.setState({
                produk  : [...this.state.produk, ...response.data.data]
            });

        }).catch(error => alert(error));
    }

    render() {
        const renderProduk = this.state.produk.map(produk => {
            return <CardProduk produk={produk} key={produk.id} refresh={this.refresh} />;
        });

        return (
            <div className="container">
                <form onSubmit={this.handlerSubmit} method="get">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Cari sesuatu ..." onChange={this.handlerChange}/>
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-outline-secondary">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                                    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={this.componentDidMount}
                    hasMore={this.state.loadMore}
                    loader={(
                      <CardProdukSkeleton key={0}/>
                    )}
                    className="row justify-content-center"
                >
                    {renderProduk}
                </InfiniteScroll>
            </div>
        );
    }
}

export default DaftarProduk;
