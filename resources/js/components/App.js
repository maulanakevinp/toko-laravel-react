import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import Header from './Header';
import DaftarProduk from './produk/DaftarProduk';
import TambahProduk from './produk/TambahProduk';
import EditProduk from './produk/EditProduk';
import Beranda from './Beranda';
import Login from './Login';

class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            login: localStorage.getItem('login') ? localStorage.getItem('login') : false,
        }
        this.auth = this.auth.bind(this);
    }

    auth(login){
        this.setState({login});
    }

    render(){
        return (
            <BrowserRouter>
                <Header login={this.state.login} auth={this.auth}/>
                <Route path="/" exact component={Beranda}/>
                <Route path="/login" exact render={(routeProps)=> this.state.login ? <Redirect to="/"/> : <Login auth={this.auth} {...routeProps} />}/>
                <Route path="/produk" exact render={() => this.state.login ? <DaftarProduk/> : <Redirect to="/login"/>}/>
                <Route path="/tambah-produk" exact render={(routeProps) => this.state.login ? <TambahProduk {...routeProps}/> : <Redirect to="/login"/>}/>
                <Route path="/edit-produk/:id" exact render={(routeProps) => this.state.login ? <EditProduk {...routeProps}/> : <Redirect to="/login"/>}/>
            </BrowserRouter>
        )
    }
}

export default App;
