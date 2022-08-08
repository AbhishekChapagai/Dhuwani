import axios from "axios";
import { Component } from "react";
// import { Row, Col, Card, CardGroup } from 'react-bootstrap';
// import '../../infoflipcard/styles.css'
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './ProductBrowsing.css'



class cosmetics extends Component {

    state = {
        cosmetics: [],

    }
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/cosmetic/showall`, this.state)
            .then((response) => {
                console.log(response)
                this.setState({
                    cosmetics: response.data.data
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }


    render() {
        return (
            <>


                <div className="container sCosmetics">
                    <div className="cBand">
                        <NavDropdown title="Filter Cosmetic By Gender" id="collasible-nav-dropdown" className="NavDropdown">
                            <LinkContainer exact to="/cosmetic/men" className="linkContainer">
                                <NavDropdown.Item >
                                    Men
                                </NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer exact to="/cosmetic/women" className="linkContainer">
                                <NavDropdown.Item>
                                    Women
                                </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </div>
                    <div className="CatCosmetics">
                        {
                            this.state.cosmetics.map((c) => {
                                return (

                                    <div className="cCat">
                                        {
                                            (<a href={"/product/cosmetic/cosmeticdetails/" + c._id}>
                                                <div className="CosmeticsImage">
                                                    <img src={`${process.env.REACT_APP_BACKEND_URL}/cosmetic/` + c.cosmeticImages[0].imageName} alt="img" />
                                                </div>
                                                <div className="CosmeticsNameCategory">
                                                    <p className="CosmeticName">&nbsp;
                                                        {
                                                            c.cosmeticname ? (c.cosmeticname) : ("Cosmetic Name")
                                                        }  {
                                                            c.cosmeticmodel ? (c.cosmeticmodel) : ("Cosmetic Model")
                                                        }<br></br>

                                                    </p>
                                                    <p className="CosmeticType">&nbsp;
                                                        {
                                                            c.cosmetictype ? (c.cosmetictype) : ("Cosmetic Type")
                                                        } / {
                                                            c.cosmeticgender ? (c.cosmeticgender) : ("Cosmetic Type")
                                                        }

                                                    </p>
                                                    <p className="cosmeticRating">RATING</p>
                                                    <p className="CosmeticPrice">NPR&nbsp;
                                                        {
                                                            c.cosmeticprice ? (c.cosmeticprice) : ("Cosmetic Price")
                                                        }

                                                    </p>

                                                </div></a>)

                                        }

                                    </div>


                                )
                            })
                        }
                    </div>

                </div>
            </>
        )

    }

}
export default cosmetics;