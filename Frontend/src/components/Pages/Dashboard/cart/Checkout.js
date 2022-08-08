import axios from "axios";
import { Component } from "react";
import "./cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import KhaltiCheckout from "khalti-checkout-web";
import config from "../khalticheckout/khaltiConfig"
import { districts, provinces } from '../../List/AddressList';

class Checkout extends Component {
    constructor() {
        super()
        this.state = {
            userid: localStorage.getItem("userid"),
            paymentmethod: "cash",

            productinfo: {
                totalamount: "",
                totalamounttax: "",
                itemcount: "",
                myproduct: []
            },
            billingfirstname: "",
            billinglastname: "",
            billingemail: "",
            billingphone: "",
            billingdistrict: "",
            billingprovince: "",
            billingaddress: "",
            billingzip: "",
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            addressBook: '',
            userId: '',
            tax: '10',
            gadgetcart: [],
            config: {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            copyinfo: false
        }
    }

    componentWillMount() {
        this.getuserdata();
        this.mytotalamount();
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    rbbutton = (e) => {
        this.setState({ paymentmethod: e.target.value })
    }

    getuserdata = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/token/decode`, this.state.config)
            .then((response) => {
                console.log(response)
                const data = response.data
                this.setState({
                    firstname: data.firstName,
                    lastname: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    addressBook: data.addressBook,
                    userId: data.userId,
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    mytotalamount = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/mycart/showall`, this.state.config)
            .then((response) => {
                console.log(response)
                this.setState({
                    gadgetcart: response.data.data
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    submitData = (e) => {
        e.preventDefault();
        const data = {
            itemcount: this.state.productinfo.itemcount,
            totalamount: this.state.productinfo.totalamount,
            totalamounttax: this.state.productinfo.totalamounttax,
            billingfirstname: this.state.billingfirstname,
            billinglastname: this.state.billinglastname,
            billingemail: this.state.billingemail,
            billingphone: this.state.billingphone,
            billingzip: this.state.billingzip,
            billingaddress: this.state.billingaddress,
            billingdistrict: this.state.billingdistrict,
            billingprovince: this.state.billingprovince,
            userid: this.state.userid,
            myproduct: this.state.gadgetcart.map(e => ({ productid: e.productid, productname: e.productname, productquantity: e.quantity, paymentmethod: this.state.paymentmethod }))
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/mycheckout/insert/`, data, this.state.config)
            .then((response) => {
                console.log(response)
                alert("Checkout successfull, thank you!")
                window.location.href = "/user/myorder"
            })
            .catch((err) => {
                console.log(err.response)
            })

        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/remove/mycart`, this.state.config)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err.response)
            })

    }


    copyInfo = (e) => {
        const { name, value, checked } = e.target;

        if (name === "copyinfo") {
            // handle the change event of language field
            if (checked) {
                // push selected value in list
                this.setState({
                    [name]: true,
                    billingfirstname: this.state.firstname,
                    billinglastname: this.state.lastname,
                    billingphone: this.state.phone,
                    billingemail: this.state.email,
                    billingaddress: this.state.addressBook.address,
                    billingzip: this.state.addressBook.zipCode,
                    billingdistrict: this.state.addressBook.district,
                    billingprovince: this.state.addressBook.province
                });
            } else {
                // remove unchecked value from the list
                this.setState({
                    [name]: false,
                    billingfirstname: '',
                    billinglastname: '',
                    billingphone: '',
                    billingemail: '',
                    billingaddress: '',
                    billingzip: '',
                    billingdistrict: '',
                    billingprovince: ''
                });
            }
        } else {
            // handle change event except language field
            this.setState({
                [name]: value
            });
        }
    }

    render() {

        let checkout = new KhaltiCheckout(config);
        let { paymentmethod } = this.state
        const totalamount = this.state.gadgetcart.reduce((totalamount, item) => totalamount + parseInt(item.quantity * item.productprice), 0)
        const totalamounttax = this.state.gadgetcart.reduce((totalamount, item) => totalamount + parseInt((item.quantity * item.productprice) + (this.state.tax / 100) * item.productprice, 0), 0)
        return (
            <div className="maincontainer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 order-md-2 mb-4 checkout-cart-container">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                Your cart total amount
                                <span class="badge badge-secondary badge-pill">3</span>
                            </h4>
                            <ul className="list-group mb-3">
                                <p value={this.state.productinfo.itemcount = this.state.gadgetcart.length}
                                    className="list-group-item d-flex justify-content-between lh-condensed"
                                    onChange={this.changeHandler}
                                    name="itemcount">
                                    <div>
                                        <h6 class="my-0">Total product</h6>
                                    </div>
                                    <span className="text-muted">{this.state.gadgetcart.length}</span>
                                </p>
                                <p className="list-group-item d-flex justify-content-between lh-condensed"
                                    onChange={this.changeHandler}>
                                    <h6 className="my-0">Products</h6>
                                    <div>{
                                        this.state.gadgetcart.map((pq) => {
                                            return (
                                                <span className="text-muted">{pq.productname}({pq.quantity})&nbsp;&nbsp;</span>
                                            );
                                        })
                                    }</div>


                                </p>
                                <p value={this.state.productinfo.totalamount = totalamount}
                                    className="list-group-item d-flex justify-content-between lh-condensed"
                                    onChange={this.changeHandler}
                                    name="totalamount">
                                    <div>
                                        <h6 className="my-0">Cart total</h6>
                                    </div>
                                    <span className="text-muted">{totalamount}</span>
                                </p>
                                <p className="list-group-item d-flex justify-content-between bg-light" onChange={this.changeHandler}>
                                    <div className="text-warning">
                                        <h6 className="my-0">Tax</h6>
                                    </div>
                                    <span className="text-warning">{this.state.tax} %</span>
                                </p>
                                <p value={this.state.productinfo.totalamounttax = totalamounttax}
                                    className="list-group-item d-flex justify-content-between"
                                    onChange={this.changeHandler}
                                    name="totalamounttax">
                                    <span className="text-success">Total incl. tax</span>
                                    <strong className="text-success">{totalamounttax}</strong>
                                </p>
                            </ul>

                        </div>

                        <div className="col-md-6 mb-3 ">

                            <h4 className="mb-3"><b>Customer information</b></h4>
                            <form className="needs-validation" novalidate>
                                <div className="row">
                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <input type="text" className="form-control" id="FirstName" placeholder="firstname" name="firstname"
                                            value={this.state.firstname} data-testid="firstname-input" disabled />
                                        <label id="firstname" htmlFor="floatingInputFirst">&nbsp;First Name*</label>
                                    </div>
                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <input type="text" className="form-control" id="LastName" placeholder="lastname" name="lastname"
                                            value={this.state.lastname} data-testid="lastname-input" onChange={this.changeHandler} disabled />
                                        <label id="lastname" htmlFor="floatingInputFirst">&nbsp;Last Name*</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <input type="text" className="form-control" id="Phone" placeholder="phone" name="phone"
                                            value={this.state.phone} data-testid="phone-input" onChange={this.changeHandler} disabled />
                                        <label id="phone" htmlFor="floatingInputFirst">&nbsp;Phone*</label>
                                    </div>
                                    <div className="col-6 mb-3 form-floating mb-2 checkout-label">
                                        <input type="email" className="form-control" id="Email" placeholder="name@gmail.com" name="email" value={this.state.email}
                                            data-testid="email-input" onChange={this.changeHandler} disabled />
                                        <label id="email" htmlFor="floatingInput">Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <input type="text" className="form-control" id="Address" placeholder="Address" name="address"
                                            value={this.state.addressBook.address} data-testid="address-input"
                                            onChange={this.changeHandler} disabled />
                                        <label id="address" htmlFor="floatingInputFirst">&nbsp;Address*</label>
                                    </div>
                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <input type="text" className="form-control" id="Tole" placeholder="tole" name="tole"
                                            value={this.state.addressBook.tole} data-testid="tole-input"
                                            onChange={this.changeHandler} disabled />
                                        <label id="tole" htmlFor="floatingInputFirst">&nbsp;Tole</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-floating mb-2 col-md-6 checkout-label">
                                        <select
                                            name="province" class="custom-select d-block w-100 district-provision" id="Province"
                                            value={this.state.addressBook.province} className="form-select"
                                            aria-label="Floating label select example" onChange={this.changeHandler} disabled>
                                            {provinces.map(option =>
                                                < option key={option.label} value={option.value} >
                                                    {option.label}
                                                </option>
                                            )}
                                        </select>
                                        <label htmlFor="floatingProductType">Provision</label>
                                    </div>
                                    <div className="form-floating mb-2 col-md-6 checkout-label">
                                        <select
                                            className="form-select" id="District" name="district"
                                            value={this.state.addressBook.district}
                                            aria-label="Floating label select example" onChange={this.changeHandler} disabled>
                                            {districts.map(option =>
                                                < option key={option.label} value={option.value} >
                                                    {option.label}
                                                </option>
                                            )}
                                        </select>
                                        <label htmlFor="floatingProductType">District</label>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3 form-floating mb-2 checkout-label">
                                        <input type="text" className="form-control" id="Zip" placeholder="Zip code" name="zip"
                                            maxLength="5" value={this.state.addressBook.zipCode} data-testid="zip-input"
                                            onChange={this.changeHandler} disabled />
                                        <label id="zip" htmlFor="floatingInputFirst">&nbsp;Zip code*</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 order-md-1">
                            <form id="checkoutform" class="needs-validation" onSubmit={this.submitData} novalidate>

                                <hr className="mb-4" />
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="copyinfo"
                                        name="copyinfo" checked={this.state.copyinfo} onChange={this.copyInfo} />
                                    <label className="custom-control-label" for="same-address">&nbsp; Check box if Billing address is same as the customer info</label>
                                </div>

                                <hr className="mb-4" />

                                <h4 className="mb-3"><b>Billing Address</b></h4>
                                <div className="row">
                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <input type="text" className="form-control" id="FirstName2" placeholder="firstname" name="billingfirstname"
                                            value={this.state.billingfirstname} onChange={this.changeHandler}
                                            data-testid="billingfirstname-input" required />
                                        <label id="billingfirstname" htmlFor="floatingInputFirst">&nbsp;First Name*</label>
                                    </div>
                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <input type="text" className="form-control" id="LastName2" placeholder="lastname" name="billinglastname"
                                            value={this.state.billinglastname} data-testid="billinglastname-input" onChange={this.changeHandler} required />
                                        <label id="billinglastname" htmlFor="floatingInputFirst">&nbsp;Last Name*</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <input type="text" className="form-control" id="Phone2" placeholder="phone" name="billingphone"
                                            value={this.state.billingphone} data-testid="billingphone-input" onChange={this.changeHandler} required />
                                        <label id="billingphone" htmlFor="floatingInputFirst">&nbsp;Phone*</label>
                                    </div>
                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <input type="email" className="form-control" id="Email2" placeholder="name@gmail.com" name="billingemail"
                                            value={this.state.billingemail}
                                            data-testid="billingemail-input" onChange={this.changeHandler} required />
                                        <label id="billingemail" htmlFor="floatingInput">Email</label>
                                        {this.state.billingemail && !(/\S+@\S+\.\S+/).test(this.state.billingemail) && <span className="error-msg" data-testid="error-msg">Please enter a valid email.</span>}

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <input type="text" className="form-control" id="Address2" placeholder="Address" name="billingaddress"
                                            value={this.state.billingaddress} data-testid="billingaddress-input" onChange={this.changeHandler} required />
                                        <label id="billingaddress" htmlFor="floatingInputFirst">&nbsp;Address*</label>
                                    </div>
                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <input type="text" className="form-control" id="Zip2" placeholder="zip code" name="billingzip"
                                            maxLength="5" value={this.state.billingzip} data-testid="billingzip-input" onChange={this.changeHandler} required />
                                        <label id="billingzip" htmlFor="floatingInputFirst">&nbsp;Zip code*</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-floating mb-2 col-md-6 checkout-label">
                                        <select
                                            name="billingprovince" className="custom-select d-block w-100 district-provision" id="Province" type="text"
                                            className="form-select" value={this.state.billingprovince} data-testid="billingprovince-input"
                                            aria-label="Floating label select example" onChange={this.changeHandler} required>
                                            {provinces.map(option =>
                                                < option key={option.label} value={option.value} >
                                                    {option.label}
                                                </option>
                                            )}
                                        </select>
                                        <label htmlFor="floatingProductType">Provision</label>
                                    </div>
                                    <div className="form-floating mb-2 col-md-6 checkout-label">
                                        <select
                                            className="form-select" id="District" name="billingdistrict" type="text"
                                            value={this.state.billingdistrict} data-testid="billingdistrict-input"
                                            aria-label="Floating label select example" onChange={this.changeHandler} required>
                                            {districts.map(option =>
                                                < option key={option.label} value={option.value} >
                                                    {option.label}
                                                </option>
                                            )}
                                        </select>
                                        <label htmlFor="floatingProductType">District</label>

                                    </div>
                                </div>


                                <hr className="mb-4" />

                                <h4 className="mb-3"><b>Payment method</b></h4>
                                <div className="row">
                                    <fieldset>

                                        <div className="col-md-3 mb-3"><label className="custom-control-label" for="cash">
                                            <input id="cash" name="paymentmethod" type="radio" class="custom-control-input"
                                                onChange={this.changeHandler.bind(this)} checked={paymentmethod === 'cash'}
                                                data-testid="radio-cashbtn" value="cash" />
                                            &nbsp; Cash on Delivery</label>
                                        </div>
                                    </fieldset>
                                </div>

                                <hr className="mb-4" />
                                <div className="row">
                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <a href="/"><button type="button" className="btn btn-primary btn-lg btn-block button-shopping">
                                            Continue Shopping
                                        </button></a>
                                    </div>

                                    <div className="col-md-6 mb-3 form-floating mb-2 checkout-label">
                                        <button className="btn btn-primary btn-lg btn-block button-chkout" type="submit"
                                            id="btnCash" disabled={paymentmethod === "khalti"}  > Continue to checkout</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Checkout;