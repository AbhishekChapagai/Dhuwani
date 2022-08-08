import axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import { districts, provinces } from '../../List/AddressList';
import { userTypes } from '../../List/StatusList';
toast.configure();

const initialState = {
    emailError: "",
    passwordError: "",
    firstError: "",
    lastError: "",
    userTypeError: ""
}

export default class AddUser extends Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        province: "",
        district: "",
        address: "",
        tole: "",
        zipCode: "",
        userType: "",
        passwordHidden: true,
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }
    }
    toggleShow = this.toggleShow.bind(this);

    toggleShow() {
        this.setState({ passwordHidden: !this.state.passwordHidden });
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    submitData = (e) => {
        e.preventDefault();

        const isValid = this.validate();

        if (isValid) {
            console.log(this.state);
            // clear form
            this.setState(initialState);

            axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/user/add`, this.state, this.state.config)
                .then((response) => {
                    console.log(response.data.success);
                    this.setState({
                        success: response.data.success
                    })

                    toast.success('User added.', {
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

                    this.setState({
                        success: err.response.data.success
                    })

                    toast.error('Failed to add user!!!', {
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
        let passwordError = "";
        let firstError = "";
        let lastError = "";
        let userTypeError = "";

        if (!this.state.email.includes("@")) {
            emailError = "Invalid email!!!"
        }

        if (!this.state.password) {
            passwordError = "Required!!!"
        }
        else if (this.state.password.length < 8) {
            passwordError = "Password must be minimum of 8 letters"
        }

        if (!this.state.firstname) {
            firstError = "Required!!!"
        }

        if (!this.state.lastname) {
            lastError = "Required!!!"
        }

        if (!this.state.userType) {
            userTypeError = "Required!!!"
        }


        if (emailError || passwordError || firstError || lastError || userTypeError) {
            this.setState({ emailError, passwordError, firstError, lastError, userTypeError });
            return false;
        }
        return true;
    }

    render() {

        if (localStorage.getItem('token')) {
            if (localStorage.getItem('userType') === "User") {
                return <Redirect to='/' />
            }
        }
        else {
            return <Redirect to='/login' />
        }

        return (
            <div className="AddUser mb-3" >
                <div className="container req_left_container">
                    {/* form */}
                    <div className="req_border_container col-12 col-sm-12 col-md-9 col-lg-6">
                        <div className="r_heading">
                            <h2 className="req_title"> Add a new User </h2>
                        </div>

                        <div className="r_form mb-3">
                            <form id="add_user_form">
                                <div className="form_heading">
                                    <h2>Personal Details</h2>
                                    <hr />
                                </div>

                                <div className="row g-2">
                                    <div className="col-sm-6">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingInputFirst" placeholder="First Name" name="firstname"
                                                value={this.state.firstname} data-testid="" onChange={this.changeHandler} />
                                            <label id="firstname" htmlFor="floatingInputFirst">First Name*</label>
                                            <span className="error_msg">
                                                {this.state.firstError}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingInputLast" placeholder="Last Name" name="lastname"
                                                value={this.state.lastname} data-testid="" onChange={this.changeHandler} />
                                            <label id="lastname" htmlFor="floatingInputLast">Last Name*</label>
                                            <span className="error_msg">
                                                {this.state.lastError}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-floating mb-2">
                                    <input type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" name="email"
                                        value={this.state.email} data-testid="email-input" value={this.state.email} onChange={this.changeHandler} />
                                    <label id="email" htmlFor="floatingInputEmail">Email address*</label>
                                    {this.state.email && !(/\S+@\S+\.\S+/).test(this.state.email) && <span className="error" data-testid="error-msg">Please enter a valid email.</span>}
                                    <span className="error_msg">
                                        {this.state.emailError}
                                    </span>
                                </div>

                                <div className="form-floating mb-2 input_right_icon">
                                    <input type={this.state.passwordHidden ? 'password' : 'text'} className="form-control form_control_input" id="floatingPassword" placeholder="Password" name="password"
                                        value={this.state.password} data-testid="password-input" value={this.state.password} onChange={this.changeHandler} />
                                    <i id="input_form_right_icon" className="form_right_icon"
                                        onClick={this.toggleShow}>
                                        {this.state.passwordHidden ? < i className="fas fa-eye-slash icon_change"></i> : < i className="fas fa-eye icon_change"></i>}
                                    </i>
                                    <label id="password" htmlFor="floatingPassword">Password*</label>
                                </div>
                                <span className="error_msg">
                                    {this.state.passwordError}
                                </span>

                                <div className="col-md-12">
                                    <div className="form-floating mb-2">
                                        <input type="number" className="form-control" id="floatingInputPhone" placeholder="Phone Name" name="phone"
                                            value={this.state.phone} data-testid="" onChange={this.changeHandler} />
                                        <label id="phone" htmlFor="floatingInputPhone">Phone Number</label>
                                    </div>
                                </div>

                                <div className="form_heading mt-3">
                                    <h2>Address</h2>
                                    <hr />
                                </div>

                                <div className="row g-2">
                                    <div className="form-floating mb-2 col-12 col-sm-6">
                                        <select className="form-select" id="floatingProvince" aria-label="Floating label select example"
                                            value={this.state.province}
                                            name="province" onChange={this.changeHandler}>

                                            {provinces.map(option =>
                                                <option key={option.label} value={option.value}>
                                                    {option.label}
                                                </option>)
                                            }
                                            {/* 
                                            <option selected>Select product type</option>
                                            <option>Gadget</option>
                                            <option>Cosmetic</option>
                                            <option>Other</option> */}
                                        </select>
                                        <label htmlFor="floatingProvince">Province</label>
                                    </div>

                                    <div className="form-floating mb-2 col-12 col-sm-6">
                                        <select className="form-select" id="floatingDistrict" aria-label="Floating label select example"
                                            value={this.state.district}
                                            name="district" onChange={this.changeHandler}>
                                            {/* <option value="">---- Select Your District----</option> */}
                                            {districts.map(option =>
                                                < option key={option.label} value={option.value} >
                                                    {option.label}
                                                </option>
                                            )}

                                        </select>
                                        <label htmlFor="floatingDistrict">District</label>
                                    </div>
                                </div>

                                <div className="row g-2">
                                    <div className="col-md-8">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingAddress" placeholder="Address" name="address"
                                                value={this.state.address} data-testid="" onChange={this.changeHandler} />
                                            <label id="address" htmlFor="floatingAddress">Address</label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingTole" placeholder="Tole" name="tole"
                                                value={this.state.tole} data-testid="" onChange={this.changeHandler} />
                                            <label id="tole" htmlFor="floatingTole">Tole</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-floating mb-2">
                                        <input type="number" className="form-control" id="floatingZipCode" placeholder="Zip Code" name="zipCode"
                                            value={this.state.zipCode} data-testid="" onChange={this.changeHandler} maxLength="2" min="10" max="200" />
                                        <label id="zipCode" htmlFor="floatingZipCode">Zip Code</label>
                                    </div>
                                </div>

                                <div className="form_heading mt-3">
                                    <h2>Account Type</h2>
                                    <hr />
                                </div>

                                <div className="form-floating mb-2 col-12">
                                    <select className="form-select" id="floatingUserType" aria-label="Floating label select example"
                                        value={this.state.userType}
                                        name="userType" onChange={this.changeHandler}>

                                        {userTypes.map(option =>
                                            <option key={option.label} value={option.value}>
                                                {option.label}
                                            </option>)
                                        }
                                    </select>
                                    <label htmlFor="floatingUserType">User Type*</label>
                                    <span className="error_msg">
                                        {this.state.userTypeError}
                                    </span>
                                </div>

                                <span className="p-1 ">* = Required Field.</span>
                                <button type="submit" id="btn_req_product" className="btn btn_primary_color btn-md btn-block"
                                    onClick={this.submitData}>Add User</button>
                            </form>

                            {/* 
                            <p className="r_form_agree">
                                        By clicking Register, you agree to our <b>Terms of Service </b> and <b>Privacy Policy</b>.
                                    </p>

                                    <p className="r_form_login">
                                        Already have an account? <a className="l_link" href="/login"> Log in </a>
                                    </p> */}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
