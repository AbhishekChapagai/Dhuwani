import axios from 'axios';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import './style.css';
toast.configure();


class VerifyEmail extends Component {
    state = {
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }
    }

    send_mail = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login/send/validation-mail`, this.state, this.state.config)
            .then((response) => {
                console.log(response);
                this.setState({
                    success: response.data.success
                })

                toast.success('Verification email sent.', {
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
                console.log(err.response);

                toast.error('Failed to sent email.', {
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

    render() {
        return (
            <div className="VerifyEmail" >
                <div className="container verify_container col-xl-6 col-lg-6 col-md-6 ol-sm-10">
                    <h2 className="email_heading">Verify Your Email Address</h2>
                    <span className="email_msg">
                        Before you can access your account, you must first verify your email address. An email was sent to you.
                        Please also check your spam folder as well.
                    </span>
                    <span className="email_msg">
                        You didn't recieve an email. Click the button below to send an email once again.
                    </span>
                    <button className="btn btn_primary_color btn_send_verification" onClick={this.send_mail}>Send Email</button>
                </div>
            </div>
        )
    }
}

export default VerifyEmail;