import React, { Component } from 'react'
import axios from "axios";
import './userProfile.css'
import { Link } from 'react-router-dom'
import Footer from '../../../Footer/Footer';

class Address extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        addressBook: '',
        province: '',
        district: '',
        address: '',
        tole: '',
        zipCode: '',
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
                    addressBook: data.addressBook,
                    img: data.img
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <>
                <div className="mainUserAddress">
                    <div className="container">
                        <div className="row">
                            <div className="sidebarCat col-xl-2 col-lg-2 col-md-3 col-sm-12">
                                <div class="sidebar">
                                    <p className="helloUser">Hello, {this.state.firstName}</p>
                                    <p className="verified"><i class="fas fa-check"></i> Verified Account</p>
                                    <p className="manageAccount">Manage your account</p>
                                    <Link to="/user/profile"><a>MY PROFILE</a></Link>
                                    <Link to="/user/address"><a class="active">MY ADDRESS</a></Link>
                                    <Link to="/user/myorder"><a className="sidebara">MY ORDER</a></Link>
                                </div>
                            </div>

                            <div className="cardSection col-xl-10 col-lg-10 col-md-9 col-sm-12 ">
                                <div class="page-content page-container" id="page-content">
                                    <div class="padding">
                                        <div class="row container d-flex justify-content-center">

                                            <div class="col-12">
                                                <div class="card user-card-full addressCard">
                                                    <div class="row m-l-0 m-r-0">

                                                        <div class="col-sm-12">
                                                            <div class="card-block">
                                                                <h5 class="m-b-20 p-b-5 b-b-default f-w-600">My address</h5>
                                                                <div class="row">
                                                                    <div class="col-sm-3">
                                                                        <p class="m-b-9">Province</p>
                                                                        <p class="text-unmuted">{this.state.addressBook.province ? (this.state.addressBook.province) : ("Province")}</p>
                                                                    </div>
                                                                    <div class="col-sm-3">
                                                                        <p class="m-b-9">District</p>
                                                                        <p class="text-unmuted">{this.state.addressBook.district ? (this.state.addressBook.district) : ("District")}</p>
                                                                    </div>
                                                                    <div class="col-sm-3">
                                                                        <p class="m-b-9">Address</p>
                                                                        <p class="text-unmuted">{this.state.addressBook.address ? (this.state.addressBook.address) : ("Address")}</p>
                                                                    </div>
                                                                    <div class="col-sm-3">
                                                                        <p class="m-b-9">Tole</p>
                                                                        <p class="text-unmuted">{this.state.addressBook.tole ? (this.state.addressBook.tole) : ("Tole")}</p>
                                                                    </div>

                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-sm-3">
                                                                        <p class="m-b-9">ZIP Code</p>
                                                                        <p class="text-unmuted">{this.state.addressBook.zipCode ? (this.state.addressBook.zipCode) : ("ZIP Code")}</p>
                                                                    </div>
                                                                    <div class="col-12 col-sm-6">
                                                                        <Link to='/user/edit'> <div className="addressEdit">EDIT ADDRESS</div></Link>
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


export default Address