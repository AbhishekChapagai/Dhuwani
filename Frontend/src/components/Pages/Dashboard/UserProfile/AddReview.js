import React, { Component } from 'react'
import axios from "axios";
import './profileEdit.css'
import './review.css';
import Sidebar from './Sidebar';
import Rating from '@material-ui/lab/Rating';
import { toast } from 'react-toastify';
toast.configure();

class AddReview extends Component {
    state = {
        productId: this.props.match.params.id,
        rating: '',
        reviews: [],
        reviews1: [],
        gadgetImage: [],
        cosmeticImage: [],
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(this.state.rating)

    }
    componentDidMount() {

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/productone/addreview/${this.state.productId}`)
            .then((response) => {
                console.log(response.data.data[0])
                const data = response.data.data[0]

                this.setState({
                    reviews: data.productInfo1[0],
                    reviews1: data.productInfo2[0],

                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    submitData = (e) => {
        e.preventDefault();
        const stateData = this.state;
        const data = new FormData()
        if (this.state.reviewImages) {
            // looping image and sending to database
            for (const key of Object.keys(this.state.reviewImages)) {
                data.append('reviewImages', this.state.reviewImages[key])
            }
        }

        data.append('productId', stateData.productId)
        data.append('review', stateData.review)
        data.append('rating', stateData.rating)

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/product/review/`, data, this.state.config)
            .then((response) => {
                console.log(response)
                window.location.href = ""
                this.setState({
                    success: response.data.success,
                })
            })
            .catch((err) => {
                console.log(err.response);

                this.setState({
                    success: err.response.data.success
                })
            })
    }

    fileHandler = (e) => {
        if (e.target.files.length > 3.) {
            return toast.error('Limit exceed! Max 3 imgaes.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            this.setState({
                reviewImages: e.target.files
            })
        }
    }


    render() {
        var order = <>
            <div className="mainUser">
                <div className="container">
                    <div className="row">
                        <Sidebar></Sidebar>
                        <div className="cardSection col-xl-10 col-lg-10 col-md-9 col-sm-12 ">
                            <div className="page-content page-container" id="page-content">
                                <div className="padding">
                                    <div className="row container d-flex justify-content-center">
                                        Review
                                        <div className="col-12">
                                            <div className="card user-card-full profileCard">
                                                <div className="wrapper row row m-l-0 m-r-0">
                                                    {this.state.reviews ?
                                                        (
                                                            <div className=" product-img">
                                                                {this.state.reviews.gadgetImages ?
                                                                    (<img className="pic col-md-6" src={`${process.env.REACT_APP_BACKEND_URL}/gadget/` + this.state.reviews.gadgetImages[0].imageName} alt="" />) : ("")}
                                                                {this.state.reviews.gadgetname}
                                                            </div>
                                                        )
                                                        :
                                                        (""
                                                        )
                                                    }
                                                    {this.state.reviews1 ?
                                                        (
                                                            <div className=" product-img">
                                                                {this.state.reviews1.cosmeticImages ?
                                                                    (<img className="pic col-md-6" src={`${process.env.REACT_APP_BACKEND_URL}/cosmetic/` + this.state.reviews1.cosmeticImages[0].imageName} alt="" />) : ("")}
                                                                {this.state.reviews1.cosmeticname}
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            ""
                                                        )
                                                    }
                                                    <Rating
                                                        name='rating'
                                                        emptySymbol={<img src='../star-empty.png' className='icon' alt='empty star' />}
                                                        fullSymbol={<img src='../star-full.png' className='icon' alt='filled star' />}
                                                        onChange={this.changeHandler}
                                                        value={this.state.rating} />

                                                    <form>
                                                        <div className="revew-des">Review Description <br /></div>
                                                        <div className="rating-txt"> <textarea placeholder="Please provide a Feed back about this product." name="review" value={this.state.review} onChange={this.changeHandler}></textarea>
                                                        </div>
                                                        <div className="col-md-12 col-lg-10 col-12">
                                                            <div className="form-group files review-input"><label className="my-auto">Upload Your File </label> <input id="file-review" type="file" className="form-control" onChange={this.fileHandler} multiple /></div>
                                                        </div>

                                                        <button className="submit-rev btn-default" onClick={this.submitData}>submit</button>
                                                    </form>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        return (
            order
        )
    }
}


export default AddReview

