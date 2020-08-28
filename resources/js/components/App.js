import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import DaftarProduk from './DaftarProduk';
import TambahProduk from './TambahProduk';
import EditProduk from './EditProduk';

class App extends Component {

    render(){
        return (
            <BrowserRouter>
                <Header />
                <Route path="/" exact component={DaftarProduk}/>
                <Route path="/tambah-produk" exact component={TambahProduk}/>
                <Route path="/edit-produk/:id" exact component={EditProduk}/>
            </BrowserRouter>
        )
    }
}

export default App;
