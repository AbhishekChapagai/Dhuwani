import axios from 'axios';
import React, { Component } from 'react'
import UpdateOrder from './UpdateOrder';

export default class EditOrder extends Component {
    state = {
        product: [],
        checkoutDate: "",
        orderId: "",
        billingaddress: [],
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
        const id = this.props.match.params.id;
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/order/one/${id}`, this.state.config)
            .then((response) => {
                const data = response.data.data[0]
                // console.log(data.addressBook.province)
                console.log(data);
                console.log(data.myproduct);
                this.setState({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phone: data.phone,
                    productName: data.productName,
                    status: data.status,
                    productType: data.productType,
                    productLink: data.productLink,
                    productDesription: data.productDesription,
                    requestedDate: data.requestedDate,
                    product: data.myproduct,
                    checkoutDate: data.checkoutDate,
                    orderId: data._id,
                    totalamount: data.totalamount,
                    billingaddress: data.billingaddress,
                    totalamounttax: data.totalamounttax,
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="EditOrder">
                <div className="container req_left_container">
                    {/* form */}
                    <div className="req_border_container col-12 col-sm-12 col-md-9 col-lg-6">
                        <div className="r_heading">
                            <h2 className="req_title"> Requested Product Info </h2>
                        </div>

                        <div className="r_form mb-3">
                            <form id="user_edit_form">
                                <div className="form_heading">
                                    <h2>Order By</h2>
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
                                    <h2>Order Details</h2>
                                    <hr />
                                </div>
                                <div className="col-md-12">
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="floatingOID" placeholder="Order ID" name="orderId"
                                            value={this.state.orderId} data-testid=""
                                            onChange={this.changeHandler} disabled />
                                        <label id="Oid" htmlFor="floatingOID">Order ID</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="floatingReqDate" placeholder="Order Date" name="checkoutDate"
                                            value={this.state.checkoutDate} data-testid="" onChange={this.changeHandler} disabled />
                                        <label id="checkoutDate" htmlFor="floatingReqDate">Order Date*</label>
                                    </div>
                                </div>
                                <div className="row g-2">

                                    <div className="col-12 col-md-6">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingTotal" placeholder="Total Amount" name="totalamount"
                                                value={this.state.totalamount} data-testid="" onChange={this.changeHandler} disabled />
                                            <label id="totalamount" htmlFor="floatingTotal">Total Amount*</label>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingTAT" placeholder="Total Amount (Tax) " name="totalamounttax"
                                                value={this.state.totalamounttax} data-testid="" onChange={this.changeHandler} disabled />
                                            <label id="totalamounttax" htmlFor="floatingTAT">Total Amount (Tax) *</label>
                                        </div>
                                    </div>
                                </div>

                                {
                                    this.state.product.map((product, index) => {
                                        return (
                                            <UpdateOrder product={product} index={index} />
                                        )
                                    })
                                }


                                <div className="form_heading">
                                    <h2>Billing Address</h2>
                                    <hr />
                                </div>
                                <div className="row g-2">

                                    <div className="col-12 col-md-6">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingBFN" placeholder="First Name" name="billingfirstname"
                                                value={this.state.billingaddress ? (this.state.billingaddress.billingfirstname) : "Null"} data-testid=""
                                                onChange={this.changeHandler} disabled />
                                            <label id="billingfirstname" htmlFor="floatingBFN">First Name</label>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingBLN" placeholder="Last Name" name="billinglastname"
                                                value={this.state.billingaddress ? (this.state.billingaddress.billinglastname) : "Null"} data-testid=""
                                                onChange={this.changeHandler} disabled />
                                            <label id="billinglastname" htmlFor="floatingBLN">Last Name</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-2">

                                    <div className="col-12 col-md-4">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingBPhone" placeholder="Phone" name="billingphone"
                                                value={this.state.billingaddress ? (this.state.billingaddress.billingphone) : "Null"} data-testid=""
                                                onChange={this.changeHandler} disabled />
                                            <label id="billingphone" htmlFor="floatingBPhone">Phone</label>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-8">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingBEmail" placeholder="Email" name="billingemail"
                                                value={this.state.billingaddress ? (this.state.billingaddress.billingemail) : "Null"} data-testid=""
                                                onChange={this.changeHandler} disabled />
                                            <label id="billingemail" htmlFor="floatingBEmail">Email</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="floatingBAddress" placeholder="Address" name="billingaddress"
                                            value={this.state.billingaddress ? (this.state.billingaddress.billingaddress) : "Null"} data-testid=""
                                            onChange={this.changeHandler} disabled />
                                        <label id="billingaddress" htmlFor="floatingBAddress">Address</label>
                                    </div>
                                </div>

                                <div className="row g-2">

                                    <div className="col-12 col-md-4">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingBZip" placeholder="Zip Code" name="billingzip"
                                                value={this.state.billingaddress ? (this.state.billingaddress.billingzip) : "Null"} data-testid=""
                                                onChange={this.changeHandler} disabled />
                                            <label id="billingzip" htmlFor="floatingBZip">Zip Code</label>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingBDistrict" placeholder="District" name="billingdistrict"
                                                value={this.state.billingaddress ? (this.state.billingaddress.billingdistrict) : "Null"} data-testid=""
                                                onChange={this.changeHandler} disabled />
                                            <label id="billingdistrict" htmlFor="floatingBDistrict">District</label>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingBProvince" placeholder="Province" name="billingprovince"
                                                value={this.state.billingaddress ? (this.state.billingaddress.billingprovince) : "Null"} data-testid=""
                                                onChange={this.changeHandler} disabled />
                                            <label id="billingprovince" htmlFor="floatingBProvince">Province</label>
                                        </div>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
