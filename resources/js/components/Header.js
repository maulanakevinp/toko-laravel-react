import React from 'react';
import {NavLink, Link} from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand mb-0 font-weight-bold">TOKO LARAVEL REACT</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link">Beranda</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/tambah-produk" className="nav-link">Tambah Produk</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
