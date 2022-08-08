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

class LaptopDetails extends Component {
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
                console.log("successful")

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
                console.log(err)

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
            <div className="container">
                {
                    this.state.gadgets.map((l) => {
                        return (
                            <div>
                                <div className="details-card">
                                    <div className="container-fliud">
                                        <div className="wrapper row">
                                            <div className="preview col-md-6">

                                                <ImageGallery items={images} />
                                            </div>


                                            <div className="details col-md-6">
                                                <h3 className="product-title" value={this.state.productname = l.gadgetname}{...this.state.producttype = l.gadgettype} onChange={e => { this.setState({ productname: e.target.value }) }}>{l.gadgetname}</h3>
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


                                                        <div className="btn-minus" onClick={this.itemMinus}><i className="glyphicon glyphicon-minus"></i><i className="fas fa-minus"></i></div>
                                                        <input value={this.state.quantity} onChange={e => { this.setState({ quantity: e.target.value }) }} disabled />
                                                        <div className="btn-plus" onClick={this.itemPlus}>< i className="bi bi-plus"></i><i className="fas fa-plus quantity-plus"></i></div>


                                                    </div>
                                                </div>

                                                <h4 className="price" value={this.state.productprice = l.gadgetprice} onChange={e => { this.setState({ productprice: e.target.value }) }}>current price: <span>Rs {l.gadgetprice}</span></h4>
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
                                        {l.gadgetdescription}
                                    </p>
                                    <a className="showmore" role="button" className="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    </a>
                                </div>
                                <div className="container product-details">
                                    <a className="spec-title"> Additional Specification</a>
                                    <div className="row product-row">
                                        <div className="col">
                                            <a className="spec-head">General </a>
                                        </div>
                                        <div className="col product-col">
                                            <div className="col ">Brand  :</div>
                                            <div className="col">Model  :</div>
                                            <div className="col">Dimensions (mm)  :</div>
                                            <div className="col">Weight (kg)  :</div>
                                        </div>
                                        <div className="col ">
                                            <div className="col ">{l.brandName}</div>
                                            <div className="col">{l.laptop.laptopModel}</div>
                                            <div className="col">{l.laptop.laptopDimension}</div>
                                            <div className="col">{l.laptop.laptopWeight}</div>
                                        </div>
                                    </div>
                                    <div className="row product-row">
                                        <div className="col">
                                            <a className="spec-head"> Display </a>
                                        </div>
                                        <div className="col product-col">
                                            <div className="col">Size  :</div>
                                            <div className="col">Resolution  :</div>
                                        </div>
                                        <div className="col">
                                            <div className="col">{l.laptop.laptopSize}</div>
                                            <div className="col">{l.laptop.laptopResolution}</div>
                                        </div>
                                    </div>
                                    <div className="row product-row">
                                        <div className="col">
                                            <a className="spec-head"> Processor </a>
                                        </div>
                                        <div className="col product-col">
                                            <div className="col">Processor  :</div>
                                            <div className="col">Base Clock Speed  :</div>
                                        </div>
                                        <div className="col">
                                            <div className="col">{l.laptop.laptopProcessor}</div>
                                            <div className="col">{l.laptop.laptopBaseClock}</div>
                                        </div>
                                    </div>
                                    <div className="row product-row">
                                        <div className="col">
                                            <a className="spec-head">   Memory </a>
                                        </div>
                                        <div className="col product-col">
                                            <div className="col">RAM  :</div>


                                        </div>
                                        <div className="col">
                                            <div className="col">{l.laptop.laptopRam}</div>


                                        </div>
                                    </div>
                                    <div className="row product-row">
                                        <div className="col">
                                            <a className="spec-head">  Graphics </a>
                                        </div>
                                        <div className="col product-col">
                                            <div className="col ">Graphics Processor  :</div>
                                            <div className="col">Dedicated Graphic Memory Type  :</div>
                                            <div className="col">Dedicated Graphics  :</div>
                                        </div>
                                        <div className="col">
                                            <div className="col">{l.laptop.laptopGraphic}</div>
                                            <div className="col">{l.laptop.laptopDedicatedGraphicMemory}</div>
                                            <div className="col">{l.laptop.laptopDedicatedGraphic}</div>
                                        </div>
                                    </div>
                                    <div className="row product-row">
                                        <div className="col">
                                            <a className="spec-head">  Storage</a>
                                        </div>
                                        <div className="col product-col">
                                            <div className="col">Hard disk  :</div>
                                            <div className="col">SSD  :</div>
                                        </div>
                                        <div className="col">
                                            <div className="col">{l.laptop.laptopHarddisk}</div>
                                            <div className="col">{l.laptop.laptopSSD}</div>
                                        </div>
                                    </div>
                                    <div className="row product-row">
                                        <div className="col">
                                            <a className="spec-head">Ports and slots </a>
                                        </div>
                                        <div className="col product-col">
                                            <div className="col">Number of USB Ports  :</div>
                                            <div className="col">USB Ports  :</div>
                                            <div className="col">HDMI Port  :</div>
                                            <div className="col">Multi Card Slot  :</div>
                                            <div className="col">Headphone and Mic Combo Jack  :</div>
                                            <div className="col">RJ45 (LAN)  :</div>
                                        </div>
                                        <div className="col">
                                            <div className="col">{l.laptop.laptopNoOfUSBPorts}</div>
                                            <div className="col">{l.laptop.laptopUSBPorts}</div>
                                            <div className="col">{l.laptop.laptopHDMIPorts}</div>
                                            <div className="col">{l.laptop.laptopMultiCardSlot}</div>
                                            <div className="col">{l.laptop.laptopHeadphone}</div>
                                            <div className="col">{l.laptop.laptopJack}</div>
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



export default LaptopDetails;