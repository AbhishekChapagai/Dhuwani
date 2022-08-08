import React, { Component } from 'react'
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './landing.css';


class Featured extends Component {

  state = {
    gadget: [],
    config: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    },
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/gadget/featured`, this.state)
      .then((response) => {
        console.log(response)
        this.setState({
          gadget: response.data.data
        })
      })
      .catch((err) => {
        console.log(err.response)
      })

  }


  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1265,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 1201,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 1080,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]

    };

    return (
      <>

        {/* GADGET CATEGORY */}
        <div className="container displayGadget">
          <div className="container showGadget">
            <div className="row gadgetBand">
              <h1 className="txtCamera"><span>Featured Gadgets<strong>F</strong></span></h1>                        </div>
            {/* <div className="row mainCatGadget col-sm-12"> */}
            <Slider {...settings} className="mainCatGadget">
              {
                this.state.gadget.map((g) => {
                  return (

                    <a href={"/product/gadget/laptopdetails/" + g._id} className="col-sm-3 gadgetCat">
                      <div className="catGadgetImage">
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/gadget/` + g.gadgetImages[0].imageName} alt="img" />
                      </div>
                      <div className="GadgetNameCategory">
                        <p className="GadgetName">
                          {
                            g.gadgetname ? (g.gadgetname) : ("Name")
                          } {g.laptop ? (g.laptop.laptopModel) : ("Model")} / {g.laptop ? (g.laptop.laptopRam) : ("RAM")} RAM / {g.laptop ? (g.laptop.laptopSize) : ("Size")} / {g.laptop ? (g.laptop.laptopGraphic) : ("Graphic")} / {g.laptop ? (g.laptop.laptopProcessor) : ("Processor")} <br></br>

                        </p>
                        <p className="ratingGadget">RATING</p>
                        <p className="GadgetPrice">&nbsp;Rs&nbsp;
                          {
                            g.gadgetprice
                          }

                        </p>
                      </div>
                    </a>

                  )
                })
              }
              {/* </div> */}
            </Slider>
          </div>

        </div>

      </>
    )
  }

}

export default Featured