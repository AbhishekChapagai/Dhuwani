import React, { Component } from 'react';
import axios from "axios";
import "./request.css";
import { toast } from 'react-toastify';

toast.configure();

class request extends Component {
    state = {
        productName: "",
        productType: "",
        productLink: "",
        productDesription: "",
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    submitData = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/product-request`, this.state, this.state.config)
            .then((response) => {
                console.log(response.data.success);
                this.setState({
                    success: response.data.success
                })

                toast.success('Product Requested Successfully.', {
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

                toast.error('Product Request Failed!!!', {
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


        return (
            <>
                {/* req = request */}
                <div className="RequestProduct">
                    <div className="container req_left_container">
                        {/* form */}
                        <div className="req_border_container col-12 col-sm-12 col-md-9 col-lg-6">
                            <div className="r_heading">
                                <h2 className="req_title"> Request a Product </h2>
                            </div>

                            <div className="r_form mb-3">
                                <form id="req_form">

                                    <div className="row g-2">
                                        <div className="col-md-12">
                                            <div className="form-floating mb-2">
                                                <input type="text" className="form-control" id="floatingInputProduct" placeholder="Product Name" name="productName"
                                                    value={this.state.productName} data-testid="" onChange={this.changeHandler} />
                                                <label id="productName" htmlFor="floatingInputProduct">Product Name</label>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-floating mb-2">
                                        <select className="form-select" id="floatingProductType" aria-label="Floating label select example"
                                            value={this.state.productType} name="productType" onChange={this.changeHandler}>
                                            <option selected>Select product type</option>
                                            <option>Gadget</option>
                                            <option>Cosmetic</option>
                                            <option>Other</option>
                                        </select>
                                        <label htmlFor="floatingProductType">Product Type</label>
                                    </div>

                                    <div className="row g-2">
                                        <div className="col-md-12">
                                            <div className="form-floating mb-2">
                                                <input type="text" className="form-control" id="floatingInputPLink" placeholder="Product Link" name="productLink"
                                                    value={this.state.productLink} data-testid="" onChange={this.changeHandler} />
                                                <label id="productLink" htmlFor="floatingInputPLink">Product Link</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating mb-2">
                                        <textarea className="form-control" placeholder="Leave a product description" id="floatingDescription" name="productDesription"
                                            value={this.state.productDesription} onChange={this.changeHandler} ></textarea>
                                        <label htmlFor="floatingDescription">Product Description</label>
                                    </div>

                                    <button type="submit" id="btn_req_product" className="btn btn_primary_color btn-md btn-block"
                                        onClick={this.submitData}>Request Product</button>
                                </form>

                                {/* <p className="r_form_agree">
                                        By clicking Register, you agree to our <b>Terms of Service </b> and <b>Privacy Policy</b>.
                                    </p>

                                    <p className="r_form_login">
                                        Already have an account? <a className="l_link" href="/login"> Log in </a>
                                    </p> */}
                            </div>
                        </div>
                    </div>
                </div>


            </>
        )
    }

}

export default request