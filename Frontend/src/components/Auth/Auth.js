import { Component } from "react";
import { Redirect } from "react-router-dom";

class Auth extends Component {
    state = {
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }
    }

    render() {
        if (localStorage.getItem('token')) {
            // email verification
            if (localStorage.getItem('verified')) {

                if (localStorage.getItem('verified') === 'true') {
                    // user type
                    if (localStorage.getItem('userType')) {
                        if (localStorage.getItem('userType') === 'User') {
                            return window.location.href = "/"
                        }
                        else if (localStorage.getItem('userType') === 'Admin') {
                            return window.location.href = "/admin/dashboard"
                        }
                        else {
                            return 'Invalid access.'
                        }
                    }
                    else {
                        return "Please contact to Support Team. Thank You."
                    }

                }
                else {
                    return <Redirect to='register/email/verify' />
                }
            }
        }
        else {
            return "Invalid Access. Please try again"
        }

        return (
            <div className="Auth">
                Loading
            </div>
        )
    }
}

export default Auth;