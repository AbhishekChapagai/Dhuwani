import React, { Component } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { featured, gadgetBrandNames, gadgetTypes } from '../../../../List/ProductList';
toast.configure();

export default class GadgetForm extends Component {
    state = {
        gadgetname: "",
        gadgetprice: "",
        gadgettype: "",
        featured: "",
        gadgetdescription: "",
        brandName: "",
        cameraType: "",
        cameraResolution: "",
        cameraSalesPackage: "",
        gadgetImages: [],

        cameraLensType: "",
        cameraLensFocalLength: "",

        cameraSensorType: "",
        cameraSensorFormat: "",
        cameraSensorSize: "",

        cameraScreenSize: "",
        cameraDisplayType: "",
        cameraDisplayResolution: "",

        cameraDimensions: "",
        cameraWeight: "",

        cameraMemoryCardType: "",
        cameraConnectivity: "",

        cameraVideoFormats: "",
        cameraHDRSupport: "",
        cameraImageFormats: "",
        cameraSupportedAudioFormats: "",
        cameraVideoResolution: "",
        cameraVideoResolutionDetails: "",

        cameraBatteryType: "",
        cameraBatteryCapacity: "",
        cameraNoOfShots: "",

        cameraMicrophone: "",
        cameraTripodSocket: "",
        cameraHeadphoneJack: "",
        cameraUSBConnectivity: "",
        cameraPictBridgeSupport: "",

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

        const {
            gadgetname,
            gadgetprice,
            gadgettype,
            featured,
            gadgetdescription,
            brandName,
            cameraType,
            cameraResolution,
            cameraSalesPackage,
            cameraLensType,
            cameraLensFocalLength,
            cameraSensorType,
            cameraSensorFormat,
            cameraSensorSize,
            cameraScreenSize,
            cameraDisplayType,
            cameraDisplayResolution,
            cameraDimensions,
            cameraWeight,
            cameraMemoryCardType,
            cameraConnectivity,
            cameraVideoFormats,
            cameraHDRSupport,
            cameraImageFormats,
            cameraSupportedAudioFormats,
            cameraVideoResolution,
            cameraVideoResolutionDetails,
            cameraBatteryType,
            cameraBatteryCapacity,
            cameraNoOfShots,
            cameraMicrophone,
            cameraTripodSocket,
            cameraHeadphoneJack,
            cameraUSBConnectivity,
            cameraPictBridgeSupport,
        } = this.state;

        const data = new FormData()

        // looping image and sending to database
        for (const key of Object.keys(this.state.gadgetImages)) {
            data.append('gadgetImages', this.state.gadgetImages[key])
        }

        data.append('gadgetname', gadgetname)
        data.append('gadgetprice', gadgetprice)
        data.append('gadgettype', gadgettype)
        data.append('featured', featured)
        data.append('brandName', brandName)
        data.append('gadgetdescription', gadgetdescription)
        data.append('cameraType', cameraType)
        data.append('cameraResolution', cameraResolution)
        data.append('cameraSalesPackage', cameraSalesPackage)
        data.append('cameraLensType', cameraLensType)
        data.append('cameraLensFocalLength', cameraLensFocalLength)
        data.append('cameraSensorType', cameraSensorType)
        data.append('cameraSensorFormat', cameraSensorFormat)
        data.append('cameraSensorSize', cameraSensorSize)
        data.append('cameraScreenSize', cameraScreenSize)
        data.append('cameraDisplayType', cameraDisplayType)
        data.append('cameraDisplayResolution', cameraDisplayResolution)
        data.append('cameraDimensions', cameraDimensions)
        data.append('cameraWeight', cameraWeight)
        data.append('cameraMemoryCardType', cameraMemoryCardType)
        data.append('cameraConnectivity', cameraConnectivity)
        data.append('cameraVideoFormats', cameraVideoFormats)
        data.append('cameraHDRSupport', cameraHDRSupport)
        data.append('cameraImageFormats', cameraImageFormats)
        data.append('cameraSupportedAudioFormats', cameraSupportedAudioFormats)
        data.append('cameraVideoResolution', cameraVideoResolution)
        data.append('cameraVideoResolutionDetails', cameraVideoResolutionDetails)
        data.append('cameraBatteryType', cameraBatteryType)
        data.append('cameraBatteryCapacity', cameraBatteryCapacity)
        data.append('cameraNoOfShots', cameraNoOfShots)
        data.append('cameraMicrophone', cameraMicrophone)
        data.append('cameraTripodSocket', cameraTripodSocket)
        data.append('cameraHeadphoneJack', cameraHeadphoneJack)
        data.append('cameraUSBConnectivity', cameraUSBConnectivity)
        data.append('cameraPictBridgeSupport', cameraPictBridgeSupport)

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
            <div className="CameraForm">
                <form id="camera_form">
                    <div className="row gx-3">
                        <div className="form_heading mt-3">
                            <h2>General</h2>
                            <hr />
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingName" placeholder="Camera Name" name="gadgetname"
                                    value={this.state.gadgetname} data-testid="" onChange={this.changeHandler} />
                                <label id="gadgetname" htmlFor="floatingName">Camera Name*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="number" className="form-control" id="floatingPrice" placeholder="Camera Price" name="gadgetprice"
                                    value={this.state.gadgetprice} data-testid="" onChange={this.changeHandler} />
                                <label id="gadgetprice" htmlFor="floatingPrice">Price*</label>
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
                                <label htmlFor="floatingGadgetType">Gadget Type*</label>
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
                                <input type="text" className="form-control" id="floatingCameraType" placeholder="Camera Type" name="cameraType"
                                    value={this.state.cameraType} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraType" htmlFor="floatingCameraType">Camera Type*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingResolution" placeholder="Camera Resolution" name="cameraResolution"
                                    value={this.state.cameraResolution} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraResolution" htmlFor="floatingResolution">Camera Resolution*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingSalesPack" placeholder="Sales Package" name="cameraSalesPackage"
                                    value={this.state.cameraSalesPackage} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraSalesPackage" htmlFor="floatingSalesPack">Sales Package*</label>
                            </div>
                        </div>

                        <div className="form_heading">
                            <h2>Image (Max 5)</h2>
                            <hr />
                        </div>

                        <div className="col-12 col-sm-6">
                            <div className="form-group file_uploader">
                                <input id="gadgetImages" type="file" name="gadgetImages" className="form-control gadget_image_uploader"
                                    onChange={this.fileHandler} multiple />
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Lens</h2>
                            <hr />
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingLensType" placeholder="Lens Type" name="cameraLensType"
                                    value={this.state.cameraLensType} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraLensType" htmlFor="floatingLensType">Lens Type*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingLensCons" placeholder="Lens Construction" name="cameraLensFocalLength"
                                    value={this.state.cameraLensFocalLength} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraLensFocalLength" htmlFor="floatingLensCons">Lens Construction*</label>
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Sensor</h2>
                            <hr />
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingSensorType" placeholder="Sensor Type" name="cameraSensorType"
                                    value={this.state.cameraSensorType} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraSensorType" htmlFor="floatingSensorType">Sensor Type*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingSensorFormat" placeholder="Sensor Format" name="cameraSensorFormat"
                                    value={this.state.cameraSensorFormat} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraSensorFormat" htmlFor="floatingSensorFormat">Sensor Format*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingSensorSize" placeholder="Sensor Size" name="cameraSensorSize"
                                    value={this.state.cameraSensorSize} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraSensorSize" htmlFor="floatingSensorSize">Sensor Size*</label>
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Display</h2>
                            <hr />
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingScreenSize" placeholder="Sensor Size" name="cameraScreenSize"
                                    value={this.state.cameraScreenSize} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraScreenSize" htmlFor="floatingScreenSize">Screen Size*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingDisplayType" placeholder="Display Type" name="cameraDisplayType"
                                    value={this.state.cameraDisplayType} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraDisplayType" htmlFor="floatingDisplayType">Display Type*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingDisplayResolution" placeholder="Display Resolution (dots)" name="cameraDisplayResolution"
                                    value={this.state.cameraDisplayResolution} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraDisplayResolution" htmlFor="floatingDisplayResolution">Display Resolution (dots)*</label>
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Dimensions</h2>
                            <hr />
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingDimensions" placeholder="Dimensions" name="cameraDimensions"
                                    value={this.state.cameraDimensions} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraDimensions" htmlFor="floatingDimensions">Dimensions*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingDimesions" placeholder="Camera Weight" name="cameraWeight"
                                    value={this.state.cameraWeight} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraWeight" htmlFor="floatingDimesions">Camera Weight*</label>
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Connectivity and Storage</h2>
                            <hr />
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingMemoryCardType" placeholder="Memory Card Type" name="cameraMemoryCardType"
                                    value={this.state.cameraMemoryCardType} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraMemoryCardType" htmlFor="floatingMemoryCardType">Memory Card Type*</label>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingConnectivity" placeholder="Connectivity" name="cameraConnectivity"
                                    value={this.state.cameraConnectivity} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraConnectivity" htmlFor="floatingConnectivity">Connectivity*</label>
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Image and Video Details</h2>
                            <hr />
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingVideoFormats" placeholder="Video Formats" name="cameraVideoFormats"
                                    value={this.state.cameraVideoFormats} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraVideoFormats" htmlFor="floatingVideoFormats">Video Formats*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingHDRSupport" placeholder="HDR Support" name="cameraHDRSupport"
                                    value={this.state.cameraHDRSupport} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraHDRSupport" htmlFor="floatingHDRSupport">HDR Support*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingImageFormats" placeholder="Image Formats" name="cameraImageFormats"
                                    value={this.state.cameraImageFormats} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraImageFormats" htmlFor="floatingImageFormats">Image Formats*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingSAF" placeholder="Supported Audio Formats" name="cameraSupportedAudioFormats"
                                    value={this.state.cameraSupportedAudioFormats} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraSupportedAudioFormats" htmlFor="floatingSAF">Supported Audio Formats*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingVR" placeholder="Video Resolution" name="cameraVideoResolution"
                                    value={this.state.cameraVideoResolution} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraVideoResolution" htmlFor="floatingVR">Video Resolution*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingVRD" placeholder="Video Resolution Details" name="cameraVideoResolutionDetails"
                                    value={this.state.cameraVideoResolutionDetails} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraVideoResolutionDetails" htmlFor="floatingVRD">Video Resolution Details*</label>
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Power</h2>
                            <hr />
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingBatteryType" placeholder="Battery Type" name="cameraBatteryType"
                                    value={this.state.cameraBatteryType} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraBatteryType" htmlFor="floatingBatteryType">Battery Type*</label>
                            </div>
                        </div>


                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingBatteryCap" placeholder="Battery Capacity" name="cameraBatteryCapacity"
                                    value={this.state.cameraBatteryCapacity} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraBatteryCapacity" htmlFor="floatingBatteryCap">Battery Capacity*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingNOS" placeholder="No. Of Shots" name="cameraNoOfShots"
                                    value={this.state.cameraNoOfShots} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraNoOfShots" htmlFor="floatingNOS">No. Of Shots*</label>
                            </div>
                        </div>

                        <div className="form_heading mt-3">
                            <h2>Input/Output
                            </h2>
                            <hr />
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingMicrophone" placeholder="Microphone" name="cameraMicrophone"
                                    value={this.state.cameraMicrophone} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraMicrophone" htmlFor="floatingMicrophone">Microphone*</label>
                            </div>
                        </div>


                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingTS" placeholder="Tripod Socket" name="cameraTripodSocket"
                                    value={this.state.cameraTripodSocket} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraTripodSocket" htmlFor="floatingTS">Tripod Socket*</label>
                            </div>
                        </div>


                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingHJ" placeholder="3.5mm Headphone Jack" name="cameraHeadphoneJack"
                                    value={this.state.cameraHeadphoneJack} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraHeadphoneJack" htmlFor="floatingHJ">3.5mm Headphone Jack*</label>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floating" placeholder="USB Connectivity" name="cameraUSBConnectivity"
                                    value={this.state.cameraUSBConnectivity} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraUSBConnectivity" htmlFor="floating">USB Connectivity*</label>
                            </div>
                        </div>


                        <div className="col-sm-6 col-md-4">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingPBS" placeholder="PictBridge Support" name="cameraPictBridgeSupport"
                                    value={this.state.cameraPictBridgeSupport} data-testid="" onChange={this.changeHandler} />
                                <label id="cameraPictBridgeSupport" htmlFor="floatingPBS">PictBridge Support*</label>
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
                                <textarea className="form-control" placeholder="Leave a camera description" id="floatingDescription" name="gadgetdescription"
                                    value={this.state.gadgetdescription} onChange={this.changeHandler} ></textarea>
                                <label id="gadgetdescription" htmlFor="floatingDescription">Camera Description</label>
                            </div>
                        </div>

                        {/* {this.state.inputs.map(this.renderInput)} */}
                    </div>

                    <span className="p-1">* = Required Field.</span>
                    <button type="submit" id="btn_camera_form" className="btn btn_primary_color btn-md btn-block"
                        onClick={this.submitData}>Add Product
                    </button>
                </form>
            </div >
        )
    }
}
