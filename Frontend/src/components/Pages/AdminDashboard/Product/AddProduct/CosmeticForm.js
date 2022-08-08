import axios from 'axios';
import React, { Component } from 'react'
import { toast } from 'react-toastify';
import { cosmeticGenders, cosmeticTypes, featured, gadgetBrandNames } from '../../../List/ProductList';
toast.configure();

export default class CosmeticForm extends Component {
    state = {
        cosmeticname: "",
        cosmeticprice: "",
        cosmetictype: "",
        cosmeticgender: "",
        cosmeticmodel: "",
        cosmeticdescription: "",
        featured: "",
        brandName: "",
        cosmeticImages: [],
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(this.state)
    }

    submitData = (e) => {
        e.preventDefault();

        const states = this.state;

        const data = new FormData()

        // looping image and sending to database
        for (const key of Object.keys(this.state.cosmeticImages)) {
            data.append('cosmeticImages', this.state.cosmeticImages[key])
        }

        data.append('cosmeticname', states.cosmeticname)
        data.append('cosmeticprice', states.cosmeticprice)
        data.append('cosmetictype', states.cosmetictype)
        data.append('cosmeticgender', states.cosmeticgender)
        data.append('cosmeticmodel', states.cosmeticmodel)
        data.append('cosmeticdescription', states.cosmeticdescription)
        data.append('featured', states.featured)
        data.append('brandName', states.brandName)

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/cosmetic/insert`, data, this.state.config)
            .then((response) => {
                this.setState({
                    success: response.data.success
                })

                toast.success('Product Added.', {
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

                this.setState({
                    success: err.response.data.success
                })

                toast.error('Failed to Add Product!!!', {
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

    fileHandler = (e) => {
        if (e.target.files.length > 5) {
            return toast.error('Limit exceed! Max 5 imgaes.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (e.target.files.length == 0) {
            console.log("require at least 1 image.")
        }
        else {
            this.setState({
                cosmeticImages: e.target.files
            })
        }
    }

    render() {
        return (
            <div className="CosmeticForm">
                <form id="cosmetic_form">
                    <div className="row gx-3">
                        <div className="form_heading mt-3">
                            <h2>General</h2>
                            <hr />
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingCName" placeholder="Cosmetic Name" name="cosmeticname"
                                    value={this.state.cosmeticname} data-testid="" onChange={this.changeHandler} />
                                <label id="cosmeticname" htmlFor="floatingCName">Cosmetic Name*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="number" className="form-control" id="floatingCPric" placeholder="Camera Price" name="cosmeticprice"
                                    value={this.state.cosmeticprice} data-testid="" onChange={this.changeHandler} />
                                <label id="cosmeticprice" htmlFor="floatingCPric">Price*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <select className="form-select" id="floatingCType" aria-label="Floating label select example"
                                    value={this.state.cosmetictype}
                                    name="cosmetictype" onChange={this.changeHandler}
                                >

                                    {cosmeticTypes.map(option =>
                                        <option key={option.label} value={option.value}>
                                            {option.label}
                                        </option>)
                                    }
                                </select>
                                <label htmlFor="floatingCType">Cosmetic Type*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <select className="form-select" id="floatingGender" aria-label="Floating label select example"
                                    value={this.state.cosmeticgender}
                                    name="cosmeticgender" onChange={this.changeHandler} >

                                    {cosmeticGenders.map(option =>
                                        <option key={option.label} value={option.value}>
                                            {option.label}
                                        </option>)
                                    }
                                </select>
                                <label htmlFor="floatingGender">Gender*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <select className="form-select" id="floatingFeatured" aria-label="Floating label select example"
                                    value={this.state.featured}
                                    name="featured" onChange={this.changeHandler} >

                                    {featured.map(option =>
                                        <option key={option.label} value={option.value}>
                                            {option.label}
                                        </option>)
                                    }
                                </select>
                                <label htmlFor="floatingFeatured">Featured*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingCModel" placeholder="Cosmetic Model" name="cosmeticmodel"
                                    value={this.state.cosmeticmodel} data-testid="" onChange={this.changeHandler} />
                                <label id="cosmeticmodel" htmlFor="floatingCModel">Cosmetic Model*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <select className="form-select" id="floatingBrand" aria-label="Floating label select example"
                                    value={this.state.brandName}
                                    name="brandName" onChange={this.changeHandler} >

                                    {gadgetBrandNames.map(option =>
                                        <option key={option.label} value={option.value}>
                                            {option.label}
                                        </option>)
                                    }
                                </select>
                                <label htmlFor="floatingBrand">Brand*</label>
                            </div>
                        </div>

                        <div className="form_heading">
                            <h2>Image (Max 5)</h2>
                            <hr />
                        </div>

                        <div className="col-12 col-sm-6">
                            <div className="form-group file_uploader">
                                <input id="cosmeticImages" type="file" name="cosmeticImages" className="form-control gadget_image_uploader"
                                    onChange={this.fileHandler} multiple />
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>
                                Summary / Description
                            </h2>
                            <hr />
                        </div>
                        <div className="col-md-12">
                            <div className="form-floating mb-2">
                                <textarea className="form-control" placeholder="Leave a Cosmetic description" id="floatingDescription" name="cosmeticdescription"
                                    value={this.state.cosmeticdescription} onChange={this.changeHandler} ></textarea>
                                <label id="cosmeticdescription" htmlFor="floatingDescription">Cosmetic Description</label>
                            </div>
                        </div>

                        {/* {this.state.inputs.map(this.renderInput)} */}
                    </div>

                    <span className="p-1">* = Required Field.</span>
                    <button type="submit" id="btn_cosmetic_form" className="btn btn_primary_color btn-md btn-block"
                        onClick={this.submitData}>Add Product
                    </button>
                </form>
            </div>
        )
    }
}
