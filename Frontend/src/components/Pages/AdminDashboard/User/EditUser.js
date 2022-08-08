import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { districts, provinces } from '../../List/AddressList';
import { accountStatus_list, userTypes, verified_list } from '../../List/StatusList';
import { Redirect } from 'react-router';
toast.configure();

export class EditUser extends Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        addressBook: "",
        registeredDate: "",
        userType: "",
        verified: "",
        accountStatus: "",
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    componentDidMount() {
        const uid = this.props.match.params.id;
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/user/profile/${uid}`, this.state.config)
            .then((response) => {
                const data = response.data.data
                // console.log(data.addressBook.province)
                this.setState({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phone: data.phone,
                    addressBook: data.addressBook,
                    registeredDate: data.registeredDate,
                    userType: data.userType,
                    verified: data.verified,
                    accountStatus: data.accountStatus
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    submitData = (e) => {
        e.preventDefault();
        const uid = this.props.match.params.id;
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/admin/user/update/${uid}`, this.state, this.state.config)
            .then((response) => {
                this.setState({
                    success: response.data.success
                })

                toast.success('User Details Updated.', {
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

                toast.error('Failed to Update!!!', {
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
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('userType') === "User") {
                return <Redirect to='/' />
            }
        }
        else {
            return <Redirect to='/login' />
        }
        return (
            <div className="EditUser mb-3" >
                <div className="container req_left_container">
                    {/* form */}
                    <div className="req_border_container col-12 col-sm-12 col-md-9 col-lg-6">
                        <div className="r_heading">
                            <h2 className="req_title"> Edit User Details </h2>
                        </div>

                        <div className="r_form mb-3">
                            <form id="user_edit_form">
                                <div className="form_heading">
                                    <h2>Personal Details</h2>
                                    <hr />
                                </div>

                                <div className="row g-2">
                                    <div className="col-sm-6">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingInputFirst" placeholder="First Name" name="firstname"
                                                value={this.state.firstname} data-testid="" onChange={this.changeHandler} disabled />
                                            <label id="firstname" htmlFor="floatingInputFirst">First Name*</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingInputLast" placeholder="Last Name" name="lastname"
                                                value={this.state.lastname} data-testid="" onChange={this.changeHandler} disabled />
                                            <label id="lastname" htmlFor="floatingInputLast">Last Name*</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-floating mb-2">
                                    <input type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" name="email"
                                        value={this.state.email} data-testid="email-input" value={this.state.email} onChange={this.changeHandler} disabled />
                                    <label id="email" htmlFor="floatingInputEmail">Email address*</label>
                                    {this.state.email && !(/\S+@\S+\.\S+/).test(this.state.email) && <span className="error" data-testid="error-msg">Please enter a valid email.</span>}

                                </div>

                                <div className="col-md-12">
                                    <div className="form-floating mb-2">
                                        <input type="number" className="form-control" id="floatingInputPhone" placeholder="Phone Name" name="phone"
                                            value={this.state.phone ? (this.state.phone) : "404"} data-testid="" onChange={this.changeHandler} disabled />
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
                                            value={this.state.addressBook ? (this.state.addressBook.province) : "Null"}
                                            name="province" onChange={this.changeHandler} disabled >

                                            {provinces.map(option =>
                                                <option key={option.label} value={option.value}>
                                                    {option.label}
                                                </option>)
                                            }
                                        </select>
                                        <label htmlFor="floatingProvince">Province</label>
                                    </div>

                                    <div className="form-floating mb-2 col-12 col-sm-6">
                                        <select className="form-select" id="floatingDistrict" aria-label="Floating label select example"
                                            value={this.state.addressBook ? (this.state.addressBook.district) : "Null"}
                                            name="district" onChange={this.changeHandler} disabled>
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
                                                value={this.state.addressBook ? (this.state.addressBook.address) : "Null"} data-testid=""
                                                onChange={this.changeHandler} disabled />
                                            <label id="address" htmlFor="floatingAddress">Address</label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingTole" placeholder="Tole" name="tole"
                                                value={this.state.addressBook ? (this.state.addressBook.tole) : "Null"} data-testid=""
                                                onChange={this.changeHandler} disabled />
                                            <label id="tole" htmlFor="floatingTole">Tole</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="floatingZipCode" placeholder="Zip Code" name="zipCode"
                                            value={this.state.addressBook ? (this.state.addressBook.zipCode) : "Null"}
                                            data-testid="" onChange={this.changeHandler} disabled />
                                        <label id="zipCode" htmlFor="floatingZipCode">Zip Code</label>
                                    </div>
                                </div>

                                <div className="form_heading mt-3">
                                    <h2>Account Details (Admin Only)</h2>
                                    <hr />
                                </div>

                                <div className="col-sm-12">
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="floatingRegisterDate" placeholder="Register Date" name="registeredDate"
                                            value={this.state.registeredDate} data-testid="" onChange={this.changeHandler} disabled />
                                        <label id="registeredDate" htmlFor="floatingRegisterDate">Register Date</label>
                                    </div>
                                </div>

                                <div className="row g-2">
                                    <div className="form-floating mb-2 col-sm-6">
                                        <select className="form-select" id="floatingEmailVerified" aria-label="Floating label select example"
                                            value={this.state.verified}
                                            name="verified" onChange={this.changeHandler}>

                                            {verified_list.map(option =>
                                                <option key={option.label} value={option.value}>
                                                    {option.label}
                                                </option>)
                                            }
                                        </select>
                                        <label htmlFor="floatingEmailVerified">Email Verified</label>
                                    </div>

                                    <div className="form-floating mb-2 col-sm-6">
                                        <select className="form-select" id="floatingUserType" aria-label="Floating label select example"
                                            value={this.state.userType}
                                            name="userType" onChange={this.changeHandler}>

                                            {userTypes.map(option =>
                                                <option key={option.label} value={option.value}>
                                                    {option.label}
                                                </option>)
                                            }
                                        </select>
                                        <label htmlFor="floatingUserType">User Type</label>
                                    </div>
                                </div>

                                <div className="form-floating mb-2 col-sm-12">
                                    <select className="form-select" id="floatingStatus" aria-label="Floating label select example"
                                        value={this.state.accountStatus}
                                        name="accountStatus" onChange={this.changeHandler}>

                                        {accountStatus_list.map(option =>
                                            <option key={option.label} value={option.value}>
                                                {option.label}
                                            </option>)
                                        }
                                    </select>
                                    <label htmlFor="floatingStatus">Account Status</label>
                                </div>


                                <span className="p-1 ">* = Required Field.</span>
                                <button type="submit" id="btn_req_product" className="btn btn_primary_color btn-md btn-block"
                                    onClick={this.submitData}>Edit User Details
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditUser
