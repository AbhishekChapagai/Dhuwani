import React, { Component, state } from 'react'
import axios from "axios";
import './userProfile.css'
import { Link } from 'react-router-dom'


class Sidebar extends Component {

    state = {
        firstname: '',
        config: {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    }
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/token/decode`, this.state.config)
            .then((response) => {
                const data = response.data
                this.setState({
                    firstName: data.firstName,

                })
            }).catch((err) => {
                console.log(err);
            })
    }


    render() {
        var sidebar =
            <>
                <div className="sidebarCat col-xl-2 col-lg-2 col-md-3 col-sm-12">
                    <div className="sidebar">
                        <p className="helloUser">Hello, {this.state.firstName}</p>
                        <p className="verified"><i class="fas fa-check"></i> Verified Account</p>
                        <p className="manageAccount">Manage your account</p>
                        <Link to="/user/profile"><a className="sidebara">MY PROFILE</a></Link>
                        <Link to="/user/address"><a className="sidebara">MY ADDRESS</a></Link>
                        <Link to="/user/myorder"><a className="sidebara active">MY ORDER</a></Link>
                    </div>
                </div>

            </>
        return (
            sidebar
        )
    }
}


export default Sidebar