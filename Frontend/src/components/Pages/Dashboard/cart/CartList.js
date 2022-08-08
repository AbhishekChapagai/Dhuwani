import { TextField } from '@material-ui/core';
import axios from 'axios';
import React, { Component } from 'react'

export default class CartList extends Component {
    state = {
        quantity: this.props.cart.quantity,
        id: this.props.id,
        cart: this.props.cart,
        removeItem: this.props.removeItem
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    itemPlus = () => {
        const plus = this.state.quantity;

        if (plus < 5) {
            this.setState({
                quantity: parseInt(this.state.quantity) + parseInt(1)
            });
        }
        else {
            alert("Maximum quantity reached!")
        }
    }

    itemMinus = () => {
        const minus = this.state.quantity;

        if (minus > 1) {
            this.setState({ quantity: parseInt(this.state.quantity) - parseInt(1) });
        }
        else {
            alert("Minimum quantity reached!")
        }
    }

    updateQty = () => {
        const cartId = this.state.cart._id
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/quantity/update/${cartId}`, this.state)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err.response)
            })
        window.location.reload(false);
    }

    render() {
        return (
            <>
                <div className="items-info">
                    <div className="product-img">{
                        this.state.cart.producttype === "Perfume" ?
                            (<img src={`${process.env.REACT_APP_BACKEND_URL}/cosmetic/` + this.state.cart.productimage} alt="img" />) :

                            this.state.cart.producttype === "Nailpolish" ?
                                (<img src={`${process.env.REACT_APP_BACKEND_URL}/cosmetic/` + this.state.cart.productimage} alt="img" />) :

                                this.state.cart.producttype === "Lotion" ?
                                    (<img src={`${process.env.REACT_APP_BACKEND_URL}/cosmetic/` + this.state.cart.productimage} alt="img" />) :

                                    this.state.cart.producttype === "Camera" ?
                                        (<img src={`${process.env.REACT_APP_BACKEND_URL}/gadget/` + this.state.cart.productimage} alt="img" />) :
                                        <img src={`${process.env.REACT_APP_BACKEND_URL}/gadget/` + this.state.cart.productimage} alt="img" />
                    }
                    </div>

                    <div className="title">
                        <h2>
                            <div>{
                                this.state.cart.producttype === "Laptop" ? (<a href={"/product/gadget/laptopdetails/" +
                                    this.state.cart.productid}>{this.state.cart.productname}</a>) :

                                    this.state.cart.producttype === "Camera" ? (<a href={"/product/gadget/cameradetails/" +
                                        this.state.cart.productid}>{this.state.cart.productname}</a>) :

                                        <a href={"/product/cosmetic/cosmeticdetails/" +
                                            this.state.cart.productid}>{this.state.cart.productname}</a>
                            }</div>
                        </h2>
                        <p>{this.state.cart.producttype}</p>
                    </div>

                    <div className="add-minus-quantity">
                        <button className="fas fa-minus minus" onClick={this.itemMinus}></button>
                        <TextField className="qty_input" type="number" InputProps={{
                            inputProps: {
                                max: 5, min: 1
                            }
                        }} value={this.state.quantity} name="quantity" onChange={this.changeHandler} disabled> </TextField>
                        <button className="fas fa-plus add" onClick={this.itemPlus}></button>

                        &nbsp; &nbsp; &nbsp; <i title='Update quantity' onClick={this.updateQty} className="fas fa-edit"
                            style={{ cursor: 'pointer' }}> </i>
                    </div>

                    <div className="item-price">
                        <h3>nrs. {this.state.cart.productprice * this.state.quantity}/-</h3>
                    </div>
                    <div className="remove-item" >
                        <i className="fas fa-trash-alt remove p-2" title='Remove item' style={{ cursor: 'pointer' }}
                            onClick={this.state.removeItem.bind(this, this.state.cart._id)} ></i>

                    </div>
                </div>
                <hr />
            </>
        )
    }
}
