import axios from "axios";
import { Component } from "react";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Microsoft extends Component{
    state = {
        gadget: [],
        config: {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        },
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/laptop/microsoft`, this.state)
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
            <>
                <div className="container showGadgets">
                    <div className="row cBand">
                        <NavDropdown title="Product Type" id="collasible-nav-dropdown" className="NavDropdown">
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

                            <a href={"/laptop/acer"}>Acer</a><br></br>
                            <a href={"/laptop/dell"}>Dell</a><br></br>
                            <a href={"/laptop/asus"}>Asus</a><br></br>
                            <a href={"/laptop/hp"}>Hp</a><br></br>
                            <a href={"/laptop/razer"}>Razer</a><br></br>
                            <a href={"/laptop/lenovo"}>Lenovo</a><br></br>
                            <a href={"/laptop/apple"}>Apple</a><br></br>
                            <a href={"/laptop/msi"}>MSI</a><br></br>
                            <a href={"/laptop/aorus"}>Aorus</a><br></br>
                            <a href={"/laptop/microsoft"}>Microsoft</a><br></br>

                        </div>


                        <div className="col-sm-10 mainCatGadgets">
                            <div className="h2Filter">
                                <h2>Microsoft Laptops</h2>
                            </div>
                            {
                                this.state.gadget.map((g) => {
                                    return (


                                        <div className="gadgetsCat">

                                            <a href={"/product/gadget/laptopdetails/" + g._id}>
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

                                                </div></a>

                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>

                </div>
            </>

        )
    }
}

export default Microsoft