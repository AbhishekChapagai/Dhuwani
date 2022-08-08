import React, { Component } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { featured, gadgetBrandNames, gadgetTypes, yesNo } from '../../../../List/ProductList';
toast.configure();

export default class LaptopForm extends Component {
    state = {
        gadgetname: "",
        gadgetprice: "",
        gadgettype: "",
        featured: "",
        gadgetdescription: "",
        brandName: "",
        gadgetImages: [],

        laptopModel: "",
        laptopDimension: "",
        laptopWeight: "",
        laptopSize: "",
        laptopResolution: "",
        laptopProcessor: "",
        laptopBaseClock: "",
        laptopRam: "",
        laptopGraphic: "",
        laptopDedicatedGraphicMemory: "",
        laptopDedicatedGraphic: "",
        laptopHarddisk: "",
        laptopSSD: "",
        laptopNoOfUSBPorts: "",
        laptopUSBPorts: "",
        laptopHDMIPorts: "",
        laptopMultiCardSlot: "",
        laptopHeadphone: "",
        laptopJack: "",

        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
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
                gadgetImages: e.target.files
            })
        }
    }


    submitData = (e) => {
        e.preventDefault();

        const stateData = this.state;

        const data = new FormData()

        // looping image and sending to database
        for (const key of Object.keys(this.state.gadgetImages)) {
            data.append('gadgetImages', this.state.gadgetImages[key])
        }

        data.append('gadgetname', stateData.gadgetname)
        data.append('gadgetprice', stateData.gadgetprice)
        data.append('gadgettype', stateData.gadgettype)
        data.append('featured', stateData.featured)
        data.append('brandName', stateData.brandName)
        data.append('gadgetdescription', stateData.gadgetdescription)
        data.append('laptopModel', stateData.laptopModel)
        data.append('laptopDimension', stateData.laptopDimension)
        data.append('laptopWeight', stateData.laptopWeight)
        data.append('laptopSize', stateData.laptopSize)
        data.append('laptopResolution', stateData.laptopResolution)
        data.append('laptopProcessor', stateData.laptopProcessor)
        data.append('laptopBaseClock', stateData.laptopBaseClock)
        data.append('laptopRam', stateData.laptopRam)
        data.append('laptopGraphic', stateData.laptopGraphic)
        data.append('laptopDedicatedGraphicMemory', stateData.laptopDedicatedGraphicMemory)
        data.append('laptopDedicatedGraphic', stateData.laptopDedicatedGraphic)
        data.append('laptopHarddisk', stateData.laptopHarddisk)
        data.append('laptopSSD', stateData.laptopSSD)
        data.append('laptopNoOfUSBPorts', stateData.laptopNoOfUSBPorts)
        data.append('laptopUSBPorts', stateData.laptopUSBPorts)
        data.append('laptopHDMIPorts', stateData.laptopHDMIPorts)
        data.append('laptopMultiCardSlot', stateData.laptopMultiCardSlot)
        data.append('laptopHeadphone', stateData.laptopHeadphone)
        data.append('laptopJack', stateData.laptopJack)

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/gadget/insert`, data, this.state.config)
            .then((response) => {
                this.setState({
                    success: response.data.success
                })

                console.log(data)
                console.log(response)

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
                console.log(err.response);

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

    render() {
        return (
            <div className="LaptopForm">
                <form id="laptop_form">
                    <div className="row gx-3">
                        <div className="form_heading mt-3">
                            <h2>General</h2>
                            <hr />
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingName" placeholder="Laptop Name" name="gadgetname"
                                    value={this.state.gadgetname} data-testid="" onChange={this.changeHandler} />
                                <label id="gadgetname" htmlFor="floatingName">Laptop Name*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="number" className="form-control" id="floatingPrice" placeholder="Laptop Price" name="gadgetprice"
                                    value={this.state.gadgetprice} data-testid="" onChange={this.changeHandler} />
                                <label id="gadgetprice" htmlFor="floatingPrice">Laptop Price*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <select className="form-select" id="floatingGadgetType" aria-label="Floating label select example"
                                    value={this.state.gadgettype = this.props.gType}
                                    name="gadgettype" onChange={this.changeHandler}
                                    disabled
                                >

                                    {gadgetTypes.map(option =>
                                        <option key={option.label} value={option.value}>
                                            {option.label}
                                        </option>)
                                    }
                                </select>
                                <label htmlFor="floatingGadgetType">Type*</label>
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

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingModel" placeholder="Model" name="laptopModel"
                                    value={this.state.laptopModel} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopModel " htmlFor="floatingModel">Model*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingDimensions" placeholder="Dimensions (mm)" name="laptopDimension"
                                    value={this.state.laptopDimension} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopDimension" htmlFor="floatingDimensions">Dimensions (mm)*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingWeight" placeholder="Weight(kg)" name="laptopWeight"
                                    value={this.state.laptopWeight} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopWeight" htmlFor="floatingWeight">Weight(kg)*</label>
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Image (Max 5)</h2>
                            <hr />
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group file_uploader">
                                <input id="gadgetImages" type="file" name="gadgetImages" className="form-control gadget_image_uploader"
                                    onChange={this.fileHandler} multiple />
                            </div>
                        </div>


                        <div className="form_heading mt-3">
                            <h2>Display</h2>
                            <hr />
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingSize" placeholder="Size" name="laptopSize"
                                    value={this.state.laptopSize} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopSize" htmlFor="floatingSize">Size*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingResolution" placeholder="Resolution" name="laptopResolution"
                                    value={this.state.laptopResolution} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopResolution" htmlFor="floatingResolution">Resolution*</label>
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Processor</h2>
                            <hr />
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingProcessor" placeholder="Processor" name="laptopProcessor"
                                    value={this.state.laptopProcessor} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopProcessor" htmlFor="floatingProcessor">Processor*</label>
                            </div>
                        </div>


                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingBCS" placeholder="Base Clock Speed" name="laptopBaseClock"
                                    value={this.state.laptopBaseClock} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopBaseClock" htmlFor="floatingBCS">Base Clock Speed*</label>
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Memory</h2>
                            <hr />
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingRAM" placeholder="RAM" name="laptopRam"
                                    value={this.state.laptopRam} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopRam" htmlFor="floatingRAM">RAM*</label>
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Graphics</h2>
                            <hr />
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingGraphicsProcessor" placeholder="Graphics Processor" name="laptopGraphic"
                                    value={this.state.laptopGraphic} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopGraphic" htmlFor="floatingGraphicsProcessor">Graphics Processor*</label>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingDGM" placeholder="Dedicated Graphic Memory Type" name="laptopDedicatedGraphicMemory"
                                    value={this.state.laptopDedicatedGraphicMemory} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopDedicatedGraphicMemory" htmlFor="floatingDGM">Dedicated Graphic Memory Type*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingDG" placeholder="Dedicated Graphics" name="laptopDedicatedGraphic"
                                    value={this.state.laptopDedicatedGraphic} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopDedicatedGraphic" htmlFor="floatingDG">Dedicated Graphics*</label>
                            </div>
                        </div>


                        <div className="form_heading mt-3">
                            <h2>Storage</h2>
                            <hr />
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingHDD" placeholder="Hard disk" name="laptopHarddisk"
                                    value={this.state.laptopHarddisk} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopHarddisk" htmlFor="floatingHDD">Hard disk*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingSSD" placeholder="SSD" name="laptopSSD"
                                    value={this.state.laptopSSD} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopSSD" htmlFor="floatingSSD">SSD*</label>
                            </div>
                        </div>


                        <div className="form_heading mt-3">
                            <h2>Ports and slots</h2>
                            <hr />
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingNOUP" placeholder="Number of USB Ports" name="laptopNoOfUSBPorts"
                                    value={this.state.laptopNoOfUSBPorts} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopNoOfUSBPorts" htmlFor="floatingNOUP">Number of USB Ports*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingUP" placeholder="USB Ports" name="laptopUSBPorts"
                                    value={this.state.laptopUSBPorts} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopUSBPorts" htmlFor="floatingUP">USB Ports*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingHDMI" placeholder="HDMI Port" name="laptopHDMIPorts"
                                    value={this.state.laptopHDMIPorts} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopHDMIPorts" htmlFor="floatingHDMI">HDMI Port*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingMCS" placeholder="Multi Card Slot" name="laptopMultiCardSlot"
                                    value={this.state.laptopMultiCardSlot} data-testid="" onChange={this.changeHandler} />
                                <label id="laptopMultiCardSlot" htmlFor="floatingMCS">Multi Card Slot*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <select className="form-select" id="floatingHMC" aria-label="Floating label select example"
                                    value={this.state.laptopHeadphone}
                                    name="laptopHeadphone" onChange={this.changeHandler} >

                                    {yesNo.map(option =>
                                        <option key={option.label} value={option.value}>
                                            {option.label}
                                        </option>)
                                    }
                                </select>
                                <label htmlFor="floatingHMC">Headphone and Mic Combo Jack*</label>
                            </div>
                        </div>


                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <select className="form-select" id="floatingRJ45" aria-label="Floating label select example"
                                    value={this.state.laptopJack}
                                    name="laptopJack" onChange={this.changeHandler} >

                                    {yesNo.map(option =>
                                        <option key={option.label} value={option.value}>
                                            {option.label}
                                        </option>)
                                    }
                                </select>
                                <label htmlFor="floatingRJ45">RJ45 (LAN)*</label>
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Summary / Description
                            </h2>
                            <hr />
                        </div>

                        <div className="col-md-12">
                            <div className="form-floating mb-2">
                                <textarea className="form-control" placeholder="Leave a laptop description" id="floatingDescription" name="gadgetdescription"
                                    value={this.state.gadgetdescription} onChange={this.changeHandler} ></textarea>
                                <label id="gadgetdescription" htmlFor="floatingDescription">Laptop Description</label>
                            </div>
                        </div>

                    </div>

                    <span className="p-1 ">* = Required Field.</span>
                    <button type="submit" id="btn_laptop_form" className="btn btn_primary_color btn-md btn-block"
                        onClick={this.submitData}> Add Product
                    </button>
                </form>

            </div>
        )
    }
}
