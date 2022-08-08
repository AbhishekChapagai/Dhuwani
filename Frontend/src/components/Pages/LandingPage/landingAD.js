import React, { Component } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import './landing.css'

class LandingAD extends Component {
    state = {
        landingAD: [],
        config: {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        },
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/landing/show`, this.state)
            .then((response) => {
                console.log(response)
                this.setState({
                    landingAD: response.data.data
                })
            })
            .catch((err) => {
                console.log(err.response)
            })

    }

    render() {
        var settings = {
            arrows: false,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000
        };

        return (
            <>
            <div className="landingAD">
                <Slider {...settings}>
                {
                                this.state.landingAD.map((l) => {
                                    return (    
                                            <div className="imagead1">
                                                <img src={`${process.env.REACT_APP_BACKEND_URL}/landingAD/` + l.landingimage} alt="img" />
                                            </div>
                                    )
                                })
                            }
                </Slider>
                </div>
            </>
        )
    }

}
export default LandingAD
