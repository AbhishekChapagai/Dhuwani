import axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import { productTypes, prStatus } from '../../../List/ProductList';
toast.configure();

export default class EditPRDetails extends Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        productName: "",
        status: "",
        productType: "",
        productLink: "",
        productDesription: "",
        requestedDate: "",
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
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/product/request/${id}`, this.state.config)
            .then((response) => {
                const data = response.data.data[0]
                // console.log(data.addressBook.province)
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
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    submitData = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/admin/product/request/edit/${id}`, this.state, this.state.config)
            .then((response) => {
                this.setState({
                    success: response.data.success
                })

                toast.success('Product Details Changed.', {
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
            <div className="EditPRDetails">
                <div className="container req_left_container">
                    {/* form */}
                    <div className="req_border_container col-12 col-sm-12 col-md-9 col-lg-6">
                        <div className="r_heading">
                            <h2 className="req_title"> Requested Product Info </h2>
                        </div>

                        <div className="r_form mb-3">
                            <form id="user_edit_form">
                                <div className="form_heading">
                                    <h2>Requested User Details</h2>
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
                                    <h2>Product Details</h2>
                                    <hr />
                                </div>

                                <div className="row g-2">
                                    <div className="col-md-12">
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="floatingPN" placeholder="Address" name="productName"
                                                value={this.state.productName} data-testid=""
                                                onChange={this.changeHandler} />
                                            <label id="pn" htmlFor="floatingPN">Product Name</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="floatingPLink" placeholder="Product Link" name="productLink"
                                            value={this.state.productLink} data-testid="" onChange={this.changeHandler} />
                                        <label id="productLink" htmlFor="floatingPLink">Product Link*</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-floating mb-2">
                                        <select className="form-select" id="floatingPType" aria-label="Floating label select example"
                                            value={this.state.productType}
                                            name="productType" onChange={this.changeHandler} >

                                            {productTypes.map(option =>
                                                <option key={option.label} value={option.value}>
                                                    {option.label}
                                                </option>)
                                            }
                                        </select>
                                        <label htmlFor="floatingPType">Prodcut Type*</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" id="floatingReqDate" placeholder="Requested Date" name="requestedDate"
                                            value={this.state.requestedDate} data-testid="" onChange={this.changeHandler} disabled />
                                        <label id="requestedDate" htmlFor="floatingReqDate">Requested Date*</label>
                                    </div>
                                </div>


                                <div className="col-md-12">
                                    <div className="form-floating mb-2">
                                        <textarea className="form-control" placeholder="Leave a description" id="floatingDescription" name="productDesription"
                                            value={this.state.productDesription} onChange={this.changeHandler} ></textarea>
                                        <label id="productDesription" htmlFor="floatingDescription">Description</label>
                                    </div>
                                </div>

                                <div className="form_heading">
                                    <h2>Product Status</h2>
                                    <hr />
                                </div>
                                <div className="col-12">
                                    <div className="form-floating mb-2">
                                        <select className="form-select" id="floatingStatus" aria-label="Floating label select example"
                                            value={this.state.status}
                                            name="status" onChange={this.changeHandler} >

                                            {prStatus.map(option =>
                                                <option key={option.label} value={option.value}>
                                                    {option.label}
                                                </option>)
                                            }
                                        </select>
                                        <label htmlFor="floatingStatus">Status*</label>
                                    </div>
                                </div>

                                <span className="p-1 ">* = Required Field.</span>
                                <button type="submit" id="btn_req_product" className="btn btn_primary_color btn-md btn-block"
                                    onClick={this.submitData}>Edit Details
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
