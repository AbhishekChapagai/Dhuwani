import React, { Component } from "react";
import Items from "./Items";
import { Scrollbars } from "react-custom-scrollbars-2";
import axios from "axios";
import "./cart.css";
import emptycart from '../../../../assets/images/emptycart.jpg';

class ContextCart extends Component {

  state = {
    userid: localStorage.getItem("userid"),
    gadgetcart: [],
    tax: 10,
    config: {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  }

  componentDidMount() {
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
    console.log(this.state.gadgetcart.length)
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  removeItem = (id) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/remove/mycart`, this.state.config)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err.response)
      })

    window.location.reload(false);
  }

  render() {

    const totalamount = this.state.gadgetcart.reduce((totalamount, item) => totalamount + parseInt(item.quantity * item.productprice), 0)
    const totalamounttax = this.state.gadgetcart.reduce((totalamount, item) => totalamount + parseInt((item.quantity * item.productprice) + (this.state.tax / 100) * item.productprice, 0), 0)

    if (this.state.gadgetcart.length === 0) {
      var cartContext = <>
        <div className="container">
          <section className="main-cart-section">

            <p className="total-items" onChange={this.changeHandler}>
              You have <span className="total-items-count" >
                {this.state.gadgetcart.length} </span>
              item in shopping cart
            </p>


            <div className="cart-items">
              <div className="cart-items-container">
                <Scrollbars autoHeight
                  autoHeightMin={150}
                  autoHeightMax={1000} className="cart-items-container">
                  <h1 style={{ textAlign: "center" }}>Your cart is Empty</h1>
                  <p style={{ textAlign: "center" }}>Please go to product page to view and add products. Thank You!</p>
                  <a className="emptycart" href="/"><img src={emptycart} /></a> <br /><br />
                  <p style={{ textAlign: "center" }}><strong><a href="/">Click to Shop Now!</a></strong></p>
                </Scrollbars>
              </div>
            </div>
          </section>
        </div>
      </>
    } else {
      var cartContext = <>
        <div className="container">
          <section className="main-cart-section">
            <p className="total-items" value={this.state.itemcount = this.state.gadgetcart.length}>
              You have <span className="total-items-count">{this.state.gadgetcart.length} </span>
              item(s) in your shopping cart
            </p>

            <div className="cart-items">
              <div className="cart-items-container">
                <Scrollbars autoHeight
                  autoHeightMin={100}
                  autoHeightMax={400} className="cart-items-container">

                  <Items></Items>

                </Scrollbars>
              </div>
            </div>

            <div className="card-total">
              <h3 value={this.state.totalamount = totalamount} onChange={this.changeHandler}>cart total:
                <span >nrs.{totalamount}</span> &nbsp; tax:<span>{this.state.tax}%</span></h3>
              <h3 value={this.state.totalamounttax = totalamounttax} onChange={this.changeHandler}>
                Total amount incl. tax: <span > nrs.{totalamounttax}/- </span>
              </h3>
              <a href="/"><button class="button">Continue Shopping</button></a>
              <a href="/checkout"><button class="button">CheckOut</button></a>
              <button class="button-clear" onClick={this.removeItem} >Clear Cart</button>
            </div>

          </section>
        </div>
      </>
    }
    return (
      cartContext
    )
  }
}
export default ContextCart;
