import axios from 'axios'
import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { productStatus } from '../../../List/ProductList';
toast.configure();

export default class UpdateOrder extends Component {
    state = {
        status: this.props.product.status,
        productname: this.props.product.productname,
        productquantity: this.props.product.productquantity,
        id: this.props.product._id,
        productid: this.props.product.productid,
        paymentmethod: this.props.product.paymentmethod,
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitData = (id) => {
        // e.preventDefault();
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/admin/order/edit/${id}`, this.state, this.state.config)
            .then((response) => {
                toast.success('Order Details Updated.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => { window.location.href = "/admin/dashboard" }, 5010);
            })
            .catch((err) => {
                toast.error('Failed to Update Product!!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        window.location.reload(false);
    }

    render() {
        return (
            <>
                <div className="row g-2">
                    <h2> Product {this.props.index + 1}</h2>
                    <div className="col-md-12">
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="floatingId" placeholder="Product Order ID" name="id"
                                value={this.state.id} data-testid=""
                                onChange={this.changeHandler} disabled />
                            <label id="id" htmlFor="floatingId">Product Order ID</label>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="floatingPid" placeholder="Product ID" name="productid"
                                value={this.state.productid} data-testid=""
                                onChange={this.changeHandler} disabled />
                            <label id="pId" htmlFor="floatingPid">Product ID</label>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="floatingPN" placeholder="Prdocut Name" name="productname"
                                value={this.state.productname} data-testid=""
                                onChange={this.changeHandler} />
                            <label id="pn" htmlFor="floatingPN">Product Name</label>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="floatingQty" placeholder="Qty" name="productquantity"
                                value={this.state.productquantity} data-testid=""
                                onChange={this.changeHandler} />
                            <label id="qty" htmlFor="floatingQty">Qty</label>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="floatingPayMethod" placeholder="Payment Method" name="paymentmethod"
                                value={this.state.paymentmethod} data-testid=""
                                onChange={this.changeHandler} />
                            <label id="payMethod" htmlFor="floatingPayMethod">Payment Method</label>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-floating mb-2">
                            <select className="form-select" id="floatingStatus" aria-label="Floating label select example"
                                value={this.state.status}
                                name="status" onChange={this.changeHandler} >

                                {productStatus.map(option =>
                                    <option key={option.label} value={option.value}>
                                        {option.label}
                                    </option>)
                                }
                            </select>
                            <label htmlFor="floatingStatus">Status*</label>
                        </div>
                    </div>

                    <button type="submit" id="btn_update_product" className="btn btn_primary_color btn-md btn-block mb-2"
                        onClick={() => this.submitData(this.state.id)}>Update Product {this.props.index + 1}
                    </button>
                </div>

            </>
        )
    }
}
