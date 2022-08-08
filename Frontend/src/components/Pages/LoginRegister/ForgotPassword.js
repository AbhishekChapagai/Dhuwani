import axios from 'axios';
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import './fp.css';
toast.configure();


const initialState = {
    emailError: "",
}

export default class ForgotPassword extends Component {
    state = {
        email: ''
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    resetPassword = (e) => {
        e.preventDefault();

        const isValid = this.validate();

        if (isValid) {
            console.log(this.state);
            // clear form
            this.setState(initialState);

            localStorage.clear();
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/forgot`, this.state)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        success: response.data.success
                    })

                    toast.success('Password Reset. Please check your email.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                })
                .catch((err) => {
                    console.log(err.response)
                    this.setState({
                        success: err.response.data.success
                    })

                    toast.error('Email Not Found.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
        }
    }

    validate = () => {
        let emailError = "";

        if (!this.state.email) {
            emailError = "Email Required!!!"
        }
        else if (!this.state.email.includes("@")) {
            emailError = "Invalid Email! Example: John@gmail.com"
        }

        if (emailError) {
            this.setState({ emailError });
            return false;
        }
        return true;
    }


    render() {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('userType') === "User") {
                return <Redirect to='/' />
            }
            else {
                return <Redirect to='/admin/dashboard' />
            }
        }

        return (
            <div className="ForgotPassword">
                {/* fp = ForgotPassword */}
                <div className="container">
                    <div className="fp_container">
                        <div className="fp_border col-sm-12 col-md-6 col-lg-5">
                            {/* logo */}
                            <div className="fp_logo">
                                {/* <img src={Logo} alt="logo" /> */}
                                <Link className="logoLink" exact to="/">
                                    <span>
                                        <i class="fas fa-paper-plane"></i> dhuwani
                                    </span>
                                </Link>
                            </div>

                            <div className="fp_heading">
                                <h2 className="fp_title">Reset Password</h2>
                                <p className="fp_content">Enter your email address to reset your password.</p>
                            </div>

                            <div className="fp_form">
                                <form id="fpForm">

                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" name="email"
                                            value={this.state.email} data-testid="email-input" onChange={this.changeHandler} />
                                        <label id="email" htmlFor="floatingEmail">Email address</label>
                                        <span className="error_msg">
                                            {this.state.emailError}
                                        </span>
                                    </div>

                                    <button id="fp_btn" className="btn btn_primary_color" onClick={this.resetPassword}>Reset</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
