import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import Axios from 'axios';

function Header({login, auth}) {

    async function handlerClick (event) {
        event.preventDefault();
        await Axios({
            url     : "/api/logout",
            method  : "get",
            headers : {
                "Content-type"  : "application/json",
                Accept          : "application/json",
                Authorization   : "Bearer " + localStorage.getItem('token')
            }
        }).then(response => {
            if (response.data.success) {
                localStorage.removeItem('token');
                localStorage.removeItem('login');
                auth(false);
            }
        }).catch(error => alert(error));
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand mb-0 font-weight-bold">TOKO LARAVEL REACT</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    { login ? (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink exact to="/" className="nav-link">Beranda</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/produk" className="nav-link">Produk</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/tambah-produk" className="nav-link">Tambah Produk</NavLink>
                            </li>
                            <li className="nav-item">
                                <a style={{cursor: "pointer"}} onClick={handlerClick} className="nav-link">Logout</a>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink exact to="/" className="nav-link">Beranda</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Header
