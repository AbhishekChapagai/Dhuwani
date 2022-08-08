import axios from "axios";
import { Component } from "react";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import '../../infoflipcard/styles.css'
import '../ProductBrowsing/ProductBrowsing.css'
import './ProductBrowsing.css'


class gadgets extends Component {

    state = {
        gadget: [],

    }
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/gadget/showall`,)
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
                <div className="gadgetsBand">
                    <NavDropdown title="Filter Gadget By Type" id="collasible-nav-dropdown " className="NavDropdown">
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


                <div className="mainCatGadgets">
                    {
                        this.state.gadget.map((g) => {
                            return (


                                <div className="gadgetsCat">
                                    {
                                        g.gadgettype === "Laptop" ? (<a href={"/product/gadget/laptopdetails/" + g._id}>
                                            <div className="catGadgetsImage">
                                                <img src={`${process.env.REACT_APP_BACKEND_URL}/gadget/` + g.gadgetImages[0].imageName} alt="img" />
                                            </div>
                                            <div className="GadgetsNameCategory">
                                                <p className="GadgetName">
                                                    {
                                                        g.gadgetname ? (g.gadgetname) : ("Name")
                                                    } {g.laptop.laptopModel ? (g.laptop.laptopModel) : ("Model")} / {g.laptop.laptopRam ? (g.laptop.laptopRam) : ("RAM")} RAM / {g.laptop.laptopSize ? (g.laptop.laptopSize) : ("Size")} / {g.laptop.laptopGraphic ? (g.laptop.laptopGraphic) : ("Graphic")} / {g.laptop.laptopProcessor ? (g.laptop.laptopProcessor) : ("Processor")} <br></br>

                                                </p>
                                                <p className="ratingGadget">RATING</p>
                                                <p className="GadgetPrice">&nbsp;Rs&nbsp;
                                                    {
                                                        g.gadgetprice ? (g.gadgetprice) : ("Price")
                                                    }

                                                </p>

                                            </div></a>) :


                                            <a href={"/product/gadget/cameradetails/" + g._id}><div className="catGadgetsImage">
                                                <img src={`${process.env.REACT_APP_BACKEND_URL}/gadget/` + g.gadgetImages[0].imageName} alt="img" />
                                            </div>
                                                <div className="GadgetsNameCategory">
                                                    <p className="CameraName">&nbsp;
                                                        {
                                                            g.gadgetname ? (g.gadgetname) : ("Name")

                                                        } {g.camera ? (g.camera.cameraModel) : ("Model")} / {g.camera ? (g.camera.cameraResolution) : ("Resolution")}/ {g.camera ? (g.camera.cameraSensorType) : ("Sensor")} / {g.camera ? (g.camera.cameraConnectivity) : ("Connectivity")} / {g.camera ? (g.camera.cameraBatteryCapacity) : ("Battery")}<br></br>

                                                    </p>

                                                    <p className="ratingGadget">RATING</p>
                                                    <p className="GadgetPrice">&nbsp;Rs&nbsp;
                                                        {
                                                            g.gadgetprice ? (g.gadgetprice) : ("Price")
                                                        }

                                                    </p>

                                                </div></a>

                                    }

                                </div>
                            )
                        })
                    }

                </div>
            </div>


        )
    }
}

export default gadgets;