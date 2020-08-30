import React, { Component } from 'react';
import Axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email       : "",
            password    : ""
        }

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
        await Axios.get('/sanctum/csrf-cookie').then(response => {
            Axios({
                url     : "/api/login",
                method  : "post",
                headers : {
                    "Content-type"  : "application/json",
                    Accept          : "application/json"
                },
                data    : this.state
            }).then(response => {
                if (response.data.success) {
                    this.props.auth(true);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('login', true);
                } else {
                    alert(response.data.message);
                    this.props.auth(false);
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
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow">
                            <div className="card-body">
                            <form onSubmit={this.handlerSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input name="email" onChange={this.handlerChange} type="email" className="form-control" id="email" placeholder="Masukkan email ..."/>
                                    <span className="invalid-feedback"></span>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input name="password" onChange={this.handlerChange} type="password" className="form-control" id="password" placeholder="Masukkan password ..."/>
                                    <span className="invalid-feedback"></span>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
