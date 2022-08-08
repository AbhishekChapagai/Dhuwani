import axios from "axios";
import { Component } from "react";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import '../../ProductBrowsing/ProductBrowsing.css'


class Gopro extends Component {
    state = {
        gadget: [],
        config: {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        },
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/camera/gopro`, this.state)
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
        return (
            <div className="container showGadgets">
                <div className="row cBand">
                    <NavDropdown title="Product Type" id="collasible-nav-dropdown" className="col-sm-2 NavDropdown">
                        <LinkContainer exact to="/product/camera" className="linkContainer">
                            <NavDropdown.Item >
                                Camera
                            </NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer exact to="/product/laptop" className="linkContainer">
                            <NavDropdown.Item>
                                Laptop
                            </NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                </div>
                <div className="row mainCategoryGadget">
                    <div className="gadgetsFilter col-sm-2">
                        <p>Filter By Brand</p>

                        <a href={"/camera/canon"}>Canon</a><br></br>
                        <a href={"/camera/nikon"}>Nikon</a><br></br>
                        <a href={"/camera/sony"}>Sony</a><br></br>
                        <a href={"/camera/gopro"}>GoPro</a><br></br>

                    </div>

                    <div className="col-sm-10 mainCatGadgets">
                        <div className="h2Filter">
                            <h2>GoPro Cameras</h2>
                        </div>
                        {
                            this.state.gadget.map((g) => {
                                return (


                                    <div className="gadgetsCat">

                                        <a href={"/product/gadget/cameradetails/" + g._id}><div className="catGadgetsImage">
                                            <img src={"http://localhost:90/gadget/" + g.gadgetImages[0].imageName} alt="img" />
                                        </div>
                                            <div className="GadgetsNameCategory">
                                                <p className="CameraName">&nbsp;
                                                    {
                                                        g.gadgetname ? (g.gadgetname) : ("Name")

                                                    } {g.camera ? (g.camera.cameraModel) : ("Model")} / {g.camera ? (g.camera.cameraResolution) : ("Resolution")}/ {g.camera ? (g.camera.cameraSensorType) : ("Sensor")} / {g.camera ? (g.camera.cameraConnectivity) : ("Connectivity")} / {g.camera ? (g.camera.cameraBatteryCapacity) : ("Battery")}<br></br>

                                                </p>

                                                <p className="ratingCamera">RATING</p>
                                                <p className="CameraPrice">&nbsp;Rs&nbsp;
                                                    {
                                                        g.gadgetprice ? (g.gadgetprice) : ("Price")
                                                    }

                                                </p>

                                            </div></a>

                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

            </div>


        )

    }

}
export default Gopro