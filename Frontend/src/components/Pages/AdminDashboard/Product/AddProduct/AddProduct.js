import React, { Component } from 'react';
import { Redirect } from 'react-router';
import CosmeticForm from './CosmeticForm';
import CameraForm from './Gadget/CameraForm';
import LaptopForm from './Gadget/LaptopForm';
import './style.css';


const productTypes = [
    {
        id: 0,
        label: "Select the product type."
    },
    {
        id: 1,
        label: "Cosmetic",
        value: "Cosmetic"
    },
    {
        id: 2,
        label: "Gadget - Camera",
        value: "Camera"
    },
    {
        id: 3,
        label: "Gadget - Laptop",
        value: "Laptop"
    }
]

export default class AddProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productType: "",
            gadgetType: "",
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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

        if (this.state.productType === "Cosmetic") {
            var display = <>
                <CosmeticForm gType="Cosmetic" />
            </>
        }
        else if (this.state.productType === "Laptop") {
            display = <>
                <LaptopForm gType="Laptop" />
            </>
        }
        else if (this.state.productType === "Camera") {
            display = <>
                <CameraForm gType="Camera" />
            </>
        }
        else {
            display = <>
                <div className="product_choice">
                    <div className="form-floating mb-2 col-8 col-sm-6 ">
                        <select className="form-select" id="floatingProvince" aria-label="Floating label select example"
                            value={this.state.productType}
                            name="productType" onChange={this.changeHandler}  >

                            {productTypes.map(option =>
                                <option key={option.label} value={option.value}>
                                    {option.label}
                                </option>)
                            }
                        </select>
                        <label htmlFor="floatingProvince">Product Type</label>
                    </div>

                </div>
            </>
        }



        return (
            <div className="AddProduct">
                <div className="container add_container">
                    <div className="add_border col-10">

                        <div className="add_title">
                            <h2 className="add_heading">
                                Add a Product
                            </h2>
                        </div>

                        <div className="add_form_container">
                            {display}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
