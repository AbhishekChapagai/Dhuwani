import React, { Component, state } from 'react'
import axios from "axios";
import './userProfile.css'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import Footer from '../../../Footer/Footer'

class Profile extends Component {

    state = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        verified: '',
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
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    verified: data.verified,
                    img: data.img
                })
            }).catch((err) => {
                console.log(err);
            })
    }


    render() {
        return (
            <>
                <div className="mainUser">
                    <div className="container">
                        <div className="row">
                            <div className="sidebarCat col-xl-2 col-lg-2 col-md-3 col-sm-12">
                                <div className="sidebar">
                                    <p className="helloUser">Hello, {this.state.firstName}</p>
                                    <p className="verified"><i class="fas fa-check"></i> Verified Account</p>
                                    <p className="manageAccount">Manage your account</p>
                                    <Link to="/user/profile"><a className="active">MY PROFILE</a></Link>
                                    <Link to="/user/address"><a href="#address" className="sidebara">MY ADDRESS</a></Link>
                                    <Link to="/user/myorder"><a className="sidebara">MY ORDER</a></Link>

                                </div>
                            </div>
                            <div className="cardSection col-xl-10 col-lg-10 col-md-9 col-sm-12 ">
                                <div className="page-content page-container" id="page-content">
                                    <div className="padding">
                                        <div className="row container d-flex justify-content-center">
                                            <div className="col-12">
                                                <div className="card user-card-full profileCard">
                                                    <div className="row m-l-0 m-r-0">

                                                        <div className="col-sm-5 user-profile">
                                                            <Avatar className="avatar" src={`${process.env.REACT_APP_BACKEND_URL}/userImg/` + this.state.img} />

                                                            {/* <img src={"http://localhost:90/userImg/" + this.state.img} className="img-radius" alt="User-Profile-Image" /> */}
                                                        </div>

                                                        <div className="col-sm-7">

                                                            <div className="card-block">

                                                                <div className="row">
                                                                    <div className="col-sm-6" >
                                                                        <p id="firstname" className="m-b-10">Firstname</p>
                                                                        <p className="text-muted">{this.state.firstName}</p>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <p id="lastname" className="m-b-10">Lastname</p>
                                                                        <p className="text-muted">{this.state.lastName}</p>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <p id="email" className="m-b-10">Email</p>
                                                                        <p className="text-muted">{this.state.email}</p>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <p id="phone" className="m-b-10">Phone</p>
                                                                        <p className="text-muted">{this.state.phone}</p>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <br></br>
                                                                        <Link to='/user/edit' id="edit-profilebtn"><div className="m-b-6"><i className="fas fa-user-edit"></i> EDIT PROFILE</div></Link>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default Profile