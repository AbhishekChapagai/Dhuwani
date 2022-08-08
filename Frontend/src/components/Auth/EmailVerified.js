import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class EmailVerified extends Component {
    state = {

    }
    componentDidMount() {
        const token = this.props.match.params.token;

        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/email/verify/${token}`)
            .then((response) => {
                console.log(response);
                this.setState({
                    success: response.data.success,
                    message: response.data.message
                })
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    render() {
        if (this.state.success === true) {
            var msg = <>
                <div className="success_page">
                    <div className="container custom_container">
                        <i class="fas fa-check-circle success_icon"></i>
                        <h1 className="success_heading">Email Address Verified.</h1>
                        <p className="success_msg">Congratulations your email address has been successfully verified.</p>
                        <Link exact to="/login">
                            <button className="btn btn_success" type='submit'> Login </button>
                        </Link>
                    </div>
                </div>
            </>
        }
        else {
            msg = <>
                <div className="error_page">
                    <div className="container custom_container">
                        <i class="fas fa-exclamation-triangle error_icon_size"></i>
                        <h1 className="error_heading">  404 - PAGE NOT FOUND</h1>
                        <p className="error_msg">The link is either broken or no longer active. Failed to verify the email address.</p>
                        <Link exact to="/login">
                            <button className="btn btn_error" type='submit'> Login </button>
                        </Link>
                    </div>
                </div>
            </>
        }
        return (
            <div className="EmailVerification">
                {msg}
            </div>
        )
    }
}

export default EmailVerified;
