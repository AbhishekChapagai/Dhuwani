import axios from "axios";
import { Component } from "react";
import './Details.css';
import Questions from './Question';
import Review from './Review';
import { toast } from "react-toastify";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
toast.configure();

const images = [];

class CameraDetails extends Component {
    constructor(props) {
        super(props);
        this.Addtocart = this.Addtocart.bind(this);
    }
    state = {
        userid: localStorage.getItem("userid"),
        id: this.props.match.params.id,
        quantity: "1",
        productname: "",
        productprice: "",
        producttype: "",
        gadgets: [],
    }
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/gadget/one/` + this.state.id)
            .then((response) => {
                for (var i = 0; i < response.data.data[0].gadgetImages.length; i++) {
                    const image = response.data.data[0].gadgetImages[i].imageName
                    images.push({ original: `${process.env.REACT_APP_BACKEND_URL}/gadget/` + image, thumbnail: `${process.env.REACT_APP_BACKEND_URL}/gadget/` + image })
                }
                this.setState({
                    gadgets: response.data.data
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
    Addtocart() {

        const data = {
            userid: this.state.userid, productid: this.state.id, quantity: this.state.quantity, productname: this.state.productname,
            productprice: this.state.productprice, producttype: this.state.producttype,
            productimage: this.state.gadgets[0].gadgetImages[0].imageName
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/mycart/insert/`, data)


            .then((response) => {
                console.log(response.data)

                toast.success('Product added to cart!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((err) => {
                console.log(err.response)

                toast.warning('Product already exist in cart!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
            this.setState({
                quantity: parseInt(this.state.quantity) - parseInt(1)
            });
        }
        else {
            alert("Minimum quantity reached!")
        }
    }

    render() {
        var description = <>
            <div className="container">{
                this.state.gadgets.map((c) => {
                    return (

                        <div>
                            <div className="details-card">
                                <div className="container-fliud">
                                    <div className="wrapper row">
                                        <div className="preview col-md-6">

                                            <ImageGallery items={images} />
                                        </div>

                                        <div className="details col-md-6">
                                            <h3 className="product-title" value={this.state.productname = c.gadgetname}{...this.state.producttype = c.gadgettype} onChange={e => { this.setState({ productname: e.target.value }) }}>{c.gadgetname}</h3>
                                            <div className="rating">
                                                <div className="stars">
                                                    <span className="fa fa-star checked"></span>
                                                    <span className="fa fa-star checked"></span>
                                                    <span className="fa fa-star checked"></span>
                                                    <span className="fa fa-star"></span>
                                                    <span className="fa fa-star"></span>
                                                </div>
                                            </div>
                                            <div className="section" >
                                                <h6 className="title-attr"><small>Quantity</small></h6>
                                                <div>

                                                    <div className="btn-minus" onClick={this.itemMinus}><i className="fas fa-minus"></i></div>
                                                    <input value={this.state.quantity} onChange={e => { this.setState({ quantity: e.target.value }) }} disabled />
                                                    <div className="btn-plus" onClick={this.itemPlus}><i className="fas fa-plus quantity-plus"></i></div>


                                                </div>
                                            </div>

                                            <h4 className="price" value={this.state.productprice = c.gadgetprice} onChange={e => { this.setState({ productprice: e.target.value }) }}>current price: <span>Rs {c.gadgetprice}</span></h4>
                                            <div className="action">
                                                <button className="add-to-cart  btn-default" type="button" onClick={this.Addtocart}>add to cart</button>
                                                <button className="like btn-default" type="button"><span className="wishlist fa fa-heart"></span></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div id="module" className="container additional-des">
                                <h3>Summary</h3>
                                <p className="collapse" id="collapseExample" aria-expanded="false">
                                    {c.gaadgetdescription}
                                </p>
                                <a role="button" className="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                </a>
                            </div>

                            <div className="container product-details">
                                <a className="spec-title"> Additional Specification</a>
                                <div className="row product-row">
                                    <div className="col">
                                        <a className="spec-head">General </a>
                                    </div>
                                    <div className="col product-col">
                                        <div className="col ">Type  :</div>
                                        <div className="col">Camera Resolution  :</div>
                                        <div className="col">Sales Package  :</div>
                                        <div className="col">Dimensions (WxHxD)  :</div>
                                        <div className="col">Camera Weight  :</div>
                                    </div>
                                    <div className="col ">
                                        <div className="col "></div>
                                        <div className="col">{c.cameraResolution}</div>
                                        <div className="col">{c.cameraSalesPackage}</div>
                                        <div className="col">{c.cameraDimensions}</div>
                                        <div className="col">{c.cameraWeight}</div>
                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col">
                                        <a className="spec-head"> Lens   </a>
                                    </div>
                                    <div className="col product-col">
                                        <div className="col">Lens Type  :</div>
                                        <div className="col">Lens Focal Length  :</div>
                                    </div>
                                    <div className="col">
                                        <div className="col">{c.cameraLensType}</div>
                                        <div className="col">{c.cameraLensFocalLength}</div>
                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col">
                                        <a className="spec-head"> Sensor    </a>
                                    </div>
                                    <div className="col product-col">
                                        <div className="col">Sensor Type  :</div>
                                        <div className="col">Sensor Format  :</div>
                                        <div className="col">Sensor Size  :</div>
                                    </div>
                                    <div className="col">
                                        <div className="col">{c.cameraSensorType}</div>
                                        <div className="col">{c.cameraSensorFormat}</div>
                                        <div className="col">{c.cameraSensorSize}</div>
                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col">
                                        <a className="spec-head">   Display    </a>
                                    </div>
                                    <div className="col product-col">
                                        <div className="col">Screen Size  :</div>
                                        <div className="col">Display Type  :</div>
                                        <div className="col">Display Resolution (dots)  :</div>


                                    </div>
                                    <div className="col">
                                        <div className="col">{c.cameraScreenSize}</div>
                                        <div className="col">{c.cameraDisplayType}</div>
                                        <div className="col">{c.cameraDisplayResolution}</div>

                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col">
                                        <a className="spec-head">  Connectivity and Storage </a>
                                    </div>
                                    <div className="col product-col">
                                        <div className="col ">Memory Card Type  :</div>
                                        <div className="col">Connectivity  :</div>

                                    </div>
                                    <div className="col">
                                        <div className="col">{c.cameraMemoryCardType}</div>
                                        <div className="col">{c.cameraConnectivity}</div>

                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col">
                                        <a className="spec-head">  Image and Video Details</a>
                                    </div>
                                    <div className="col product-col">
                                        <div className="col">Video Formats  :</div>
                                        <div className="col">HDR Support  :</div>
                                        <div className="col">Image Formats  :</div>
                                        <div className="col">Supported Audio Formats  :</div>
                                        <div className="col">Video Resolution  :</div>
                                        <div className="col">Video Resolution Details  :</div>
                                    </div>
                                    <div className="col">
                                        <div className="col">{c.cameraConnectivity}</div>
                                        <div className="col">{c.cameraHDRSupport}</div>
                                        <div className="col">{c.cameraImageFormats}</div>
                                        <div className="col">{c.cameraSupportedAudioFormats}</div>
                                        <div className="col">{c.cameraVideoResolution}</div>
                                        <div className="col">{c.cameraVideoResolutionDetails}</div>
                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col">
                                        <a className="spec-head">Power </a>
                                    </div>
                                    <div className="col product-col">
                                        <div className="col">Battery Type  :</div>
                                        <div className="col">Battery Capacity  :</div>
                                        <div className="col">No. Of Shots  :</div>

                                    </div>
                                    <div className="col">
                                        <div className="col">{c.cameraBatteryType}</div>
                                        <div className="col">{c.cameraBatteryCapacity}</div>
                                        <div className="col">{c.cameraNoOfShots}</div>

                                    </div>
                                </div>
                                <div className="row product-row">
                                    <div className="col">
                                        <a className="spec-head">Input/Output   </a>
                                    </div>
                                    <div className="col product-col">
                                        <div className="col">Microphone  :</div>
                                        <div className="col">Tripod Socket  :</div>
                                        <div className="col">3.5mm Headphone Jack  :</div>
                                        <div className="col">USB Connectivity :</div>
                                        <div className="col">PictBridge Support  :</div>

                                    </div>
                                    <div className="col">
                                        <div className="col">{c.cameraMicrophone}</div>
                                        <div className="col">{c.cameraTripodSocket}</div>
                                        <div className="col">{c.cameraHeadphoneJack}</div>
                                        <div className="col">{c.cameraUSBConnectivity}</div>
                                        <div className="col">{c.cameraPictBridgeSupport}</div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })
            }
            </div>
            <Review dataFromParent={this.state.id}></Review>
            <Questions dataFromParent={this.state.id}> </Questions>
        </>

        return (
            description
        )
    }
}


export default CameraDetails;