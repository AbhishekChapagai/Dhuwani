import axios from "axios";
import React, { Component } from 'react';
import './Review.css';
import { Avatar } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


class Review extends Component {
    state = {
        productId: this.props.dataFromParent,
        firstName: '',
        lastName: '',
        review: '',
        reviews: [],
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }

    }
    componentDidMount() {

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/productone/review/${this.state.productId}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    reviews: response.data.data
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    render() {
        var Review = <>
            <div className="container">
                <div className="card">

                    <div className="review-title review_border">Ratings & Reviews of this product</div>
                    {this.state.reviews.map((r) => {
                        return (
                            <>
                                <div className="row ">
                                    <div className=" col-md-10 col-12 mb-5">
                                        <div className="rev-prof">
                                            <Avatar className= "rev-img avatar" src={`${process.env.REACT_APP_BACKEND_URL}/userImg/` + r.img} />
                                        </div>
                                        <div className=" d-flex">
                                            <div className="d-flex flex-column  ">
                                                <h3 className="review-name mt-2 mb-0">{r.firstname} {r.lastname}</h3>
                                                <div className="rating-stars">
                                                    <Box component="fieldset" mb={3} borderColor="transparent" fontSize="1px">
                                                        <Rating name="read-only" value={r.rating} readOnly />
                                                    </Box>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row text-left">

                                            <p className="content">{r.review}</p>
                                        </div>
                                        <div className="row text-left pic-review">
                                            {
                                                r.reviewImages ? (<>

                                                    {
                                                        r.reviewImages.map((img) => {
                                                            return (
                                                                
                                                                <img className="review-pic review_border" src={`${process.env.REACT_APP_BACKEND_URL}/review/` + img.imageName} alt={img.imageName} />
                                                            )
                                                        })
                                                    }
                                                </>
                                                ) : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>

        </>

        return (Review)
    }
}
export default Review;