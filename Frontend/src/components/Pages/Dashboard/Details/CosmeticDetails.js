import axios from "axios";
import { Component } from "react";
import './Details.css';
import { toast } from "react-toastify";
import Questions from './Question';
import Review from './Review';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
toast.configure();

const cimages = [];

class CosmeticDetails extends Component {
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
        cosmetics: [],

    }
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/cosmetic/one/` + this.state.id)
            .then((response) => {

                for (var i = 0; i < response.data.data[0].cosmeticImages.length; i++) {
                    const image = response.data.data[0].cosmeticImages[i].imageName
                    cimages.push({ original: `${process.env.REACT_APP_BACKEND_URL}/cosmetic/` + image, thumbnail: `${process.env.REACT_APP_BACKEND_URL}/cosmetic/` + image })
                }
                this.setState({
                    cosmetics: response.data.data
                })
                console.log(response.data.data)
                console.log(cimages)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
    Addtocart() {
        const data = {
            userid: this.state.userid, productid: this.state.id, quantity: this.state.quantity, productname: this.state.productname,
            productprice: this.state.productprice, producttype: this.state.producttype,
            productimage: this.state.cosmetics[0].cosmeticImages[0].imageName
        }
        console.log(this.state.cosmetics[0].cosmeticImages[0].imageName)
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
            <div className="container">{
                this.state.cosmetics.map((c) => {
                    return (

                        <div>
                            <div className="details-card">
                                <div className="container-fliud">
                                    <div className="wrapper row">
                                        <div className="preview col-md-6">
                                            <ImageGallery items={cimages} />
                                        </div>

                                        <div className="details col-md-6">
                                            <h3 className="product-title" value={this.state.productname = c.cosmeticname}{...this.state.producttype = c.cosmetictype} onChange={e => { this.setState({ productname: e.target.value }) }}>{c.cosmeticname}</h3>
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

                                            <h4 className="price" value={this.state.productprice = c.cosmeticprice} onChange={e => { this.setState({ productprice: e.target.value }) }}>current price: <span>Rs {c.cosmeticprice}</span></h4>
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
                                    {c.cosmeticdescription}
                                </p>
                                <a role="button" className="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                </a>
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


export default CosmeticDetails;