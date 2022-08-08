import React, { Component, state } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import './profileEdit.css'
import { districts, provinces } from '../../List/AddressList';
import Footer from '../../../Footer/Footer'



class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
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
            img: '',
            password: '',
            currentPassword: '',
            currentPasswordHidden: true,
            passwordHidden: true,
            userId: '',
            config: {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        };
        this.submitUpdate = this.submitUpdate.bind(this)
    }
    toggleShow = this.toggleShow.bind(this);
    toggleShow() {
        this.setState({ currentPasswordHidden: !this.state.currentPasswordHidden });
    }
    togglePassword = this.togglePassword.bind(this);
    togglePassword() {
        this.setState({ passwordHidden: !this.state.passwordHidden });
    }

    componentWillMount() {
        this.getuserdata();
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fileHandler = (e) => {
        this.setState({
            img: e.target.files[0]
        })
    }

    getuserdata = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/token/decode`, this.state.config)
            .then((response) => {
                const data = response.data
                this.setState({
                    firstname: data.firstName,
                    lastname: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    address: data.addressBook.address,
                    district: data.addressBook.district,
                    province: data.addressBook.province,
                    tole: data.addressBook.tole,
                    zipCode: data.addressBook.zipCode,
                    userId: data.userId
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    submitUpdate = (e) => {
        e.preventDefault();
        const data = new FormData()

        data.append('firstname', this.state.firstname)
        data.append('lastname', this.state.lastname)
        data.append('email', this.state.email)
        data.append('phone', this.state.phone)
        data.append('currentPassword', this.state.currentPassword)
        data.append('password', this.state.password)
        data.append('province', this.state.province)
        data.append('district', this.state.district)
        data.append('address', this.state.address)
        data.append('tole', this.state.tole)
        data.append('zipCode', this.state.zipCode)
        data.append('img', this.state.img)

        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/profile/update/${this.state.userId}`, data, this.state.config)
            .then((response) => {
                console.log(response)
                alert("user updated successfully");
                localStorage.setItem("token", response.data.token);
            }).catch((err) => {
                console.log(err.response)
                alert("error updating user");
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
                                    <p className="helloUser">Hello</p>
                                    <p className="manageAccount">Manage your account</p>
                                    <Link to="/user/profile"><a className="active">My Profile</a></Link>
                                    <Link to="/user/address"><a href="#address" className="sidebara">My Address</a></Link>
                                    <Link><a href="#order" className="sidebara">My Order</a></Link>
                                </div>
                            </div>
                            <div className="cardSection col-xl-10 col-lg-10 col-md-9 col-sm-12 ">
                                <div className="page-content page-container" id="page-content">
                                    <div className="padding">
                                        <div className="row container d-flex justify-content-center">
                                            <div className="col-12">
                                                <div className="card user-card-full profilecard">
                                                    <div className="row m-l-0 m-r-0">

                                                        <div className="col-sm-12">
                                                            <div className="card-block">
                                                                <h5 className="m-b-20 p-b-5 b-b-default f-w-600">My profile</h5>
                                                                <div className="row profileRow">
                                                                    <div className="col-sm-4">
                                                                        <p className="m-b-10">Firstname</p>
                                                                        <input data-testid="firstname-input" id="form_name" type="text" name="firstname" className="form-control" value={this.state.firstname} onChange={this.changeHandler} />
                                                                    </div>
                                                                    <div className="col-sm-4">
                                                                        <p className="m-b-10">Lastname</p>
                                                                        <input data-testid="lastname-input" id="form_name" type="text" name="lastname" className="form-control" value={this.state.lastname} onChange={this.changeHandler} />
                                                                    </div>
                                                                    <div className="col-sm-4">
                                                                        <p className="m-b-10">Email</p>
                                                                        <input data-testid="email-input" id="form_name" type="email" name="email" className="form-control" value={this.state.email} onChange={this.changeHandler} />
                                                                    </div>
                                                                </div>
                                                                <div className="row profileRow2">
                                                                    <div className="col-sm-4">
                                                                        <p className="m-b-10">Phone number</p>
                                                                        <input data-testid="phone-input" id="form_name" type="text" name="phone" className="form-control" value={this.state.phone} onChange={this.changeHandler} />
                                                                    </div>
                                                                    <div className="col-sm-4">
                                                                        <p className="m-b-10">Profile Picture</p>
                                                                        <input data-testid="image-input" id="form_name" type="file" name="img" className="form-control" onChange={this.fileHandler} />
                                                                        <label> </label>
                                                                    </div>
                                                                    {/* password */}
                                                                    <div className="row rowPassword">
                                                                        <h5 className="m-b-20 p-b-5 b-b-default f-w-600">Update Password</h5>

                                                                        <div className="form-floating mb-2 input_right_icon">
                                                                            <input type={this.state.currentPasswordHidden ? 'password' : 'text'} className="form-control form_control_input inputPassword" id="floatingPassword" placeholder="Password" name="currentPassword"
                                                                                data-testid="password-input" value={this.state.currentPassword} onChange={this.changeHandler} />
                                                                            <i id="input_form_right_icon" className="form_right_icon"
                                                                                onClick={this.toggleShow}>
                                                                                {this.state.currentPasswordHidden ? < i className="fas fa-eye-slash icon_change"></i> : < i className="fas fa-eye icon_change"></i>}
                                                                            </i>
                                                                            <label id="password" htmlFor="floatingPassword" className="labelPassword">Current Password</label>
                                                                        </div>
                                                                        <div className="form-floating mb-2 input_right_icon">
                                                                            <input type={this.state.passwordHidden ? 'password' : 'text'} className="form-control form_control_input" id="floatingPassword" placeholder="Password" name="password"
                                                                                data-testid="new-password-input" value={this.state.password} onChange={this.changeHandler} />
                                                                            <i id="input_form_right_icon" className="form_right_icon"
                                                                                onClick={this.togglePassword}>
                                                                                {this.state.passwordHidden ? < i className="fas fa-eye-slash icon_change"></i> : < i className="fas fa-eye icon_change"></i>}
                                                                            </i>
                                                                            <label id="password" htmlFor="floatingPassword" className="labelPassword">New Password</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Address row */}
                                                                <div className="row addressRow">
                                                                    <h5 className="m-b-20 p-b-5 b-b-default f-w-600">My Address</h5>
                                                                    <div className="row g-2">
                                                                        <div className="form-floating mb-2 col-md-12 provinceDropdown">
                                                                            <select className="form-select" type="text" data-testid="province-input" id="floatingProvince" aria-label="Floating label select example"
                                                                                value={this.state.province}
                                                                                name="province" onChange={this.changeHandler}>

                                                                                {provinces.map(option =>
                                                                                    <option key={option.label} value={option.value}>
                                                                                        {option.label}
                                                                                    </option>)
                                                                                }

                                                                            </select>
                                                                            <label htmlFor="floatingProvince" className="editDistrictLabel">Province</label>
                                                                        </div>

                                                                        <div className="form-floating mb-2 col-md-12 provinceDropdown">
                                                                            <select className="form-select" type="text" data-testid="district-input" id="floatingDistrict" aria-label="Floating label select example"
                                                                                value={this.state.district}
                                                                                name="district" onChange={this.changeHandler}>

                                                                                {districts.map(option =>
                                                                                    < option key={option.label} value={option.value} >
                                                                                        {option.label}
                                                                                    </option>
                                                                                )}

                                                                            </select>
                                                                            <label htmlFor="floatingDistrict" className="editDistrictLabel">District</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row profileRow">
                                                                    <div className="col-sm-4">
                                                                        <p className="m-b-10">Address</p>
                                                                        <input data-testid="address-input" id="form_name" type="text" name="address" className="form-control" value={this.state.address} onChange={this.changeHandler} />
                                                                    </div>
                                                                    <div className="col-sm-4">
                                                                        <p className="m-b-10">Tole</p>
                                                                        <input data-testid="tole-input" id="form_name" type="text" name="tole" className="form-control" value={this.state.tole} onChange={this.changeHandler} />
                                                                    </div>
                                                                    <div className="col-sm-4">
                                                                        <p className="m-b-10">ZIP Code</p>
                                                                        <input data-testid="zip-input" id="form_name" type="text" name="zipCode" className="form-control" value={this.state.zipCode} onChange={this.changeHandler} />
                                                                    </div>
                                                                </div>


                                                                {/*  */}
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        <button id="save-changebtn" type="submit" value="update" className="m-b-6 buttonSaveChanges" onClick={this.submitUpdate}>SAVE CHANGES</button>

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
export default EditProfile;