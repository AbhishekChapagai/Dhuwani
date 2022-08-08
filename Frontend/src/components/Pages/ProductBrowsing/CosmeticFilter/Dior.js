import axios from "axios";
import { Component } from "react";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Dior extends Component {
  state = {
    cosmetic: [],
    config: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    },
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/cosmetic/dior`, this.state)
      .then((response) => {
        console.log(response)
        this.setState({
          cosmetic: response.data.data
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

          <div className="row cBand">
            <NavDropdown title="Gender" id="collasible-nav-dropdown" className="col-sm-2 NavDropdown">
              <LinkContainer exact to="/product/men" className="linkContainer">
                <NavDropdown.Item >
                  Men
                </NavDropdown.Item>
              </LinkContainer>

              <LinkContainer exact to="/product/women" className="linkContainer">
                <NavDropdown.Item>
                  Women
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </div>
          <div className="row mainCategoryCosmetic">
            <div className="cosmeticFilter col-sm-2">
              <div className="cosmeticName">
                <p>Filter By Brands</p>
                <a href={"/cosmetic/creed"}>Creed</a><br></br>
                <a href={"/cosmetic/hugo"}>Hugo Boss</a><br></br>
                <a href={"/cosmetic/victoria"}>Victoria Secret</a><br></br>
                <a href={"/cosmetic/dior"}>Dior</a><br></br>
              </div>
              <div className="cosmeticFilterType">
                <p>Filter By Type</p>
                <a href={"/cosmetic/perfume"}>Perfume</a><br></br>
                <a href={"/cosmetic/nailpolish"}>Nail Polish</a><br></br>
                <a href={"/cosmetic/lotion"}>Lotion</a><br></br>
              </div>

            </div>
            <div className="col-sm-10 mainCatCosmetics">
              <div className="h2Filter">
                <h2>Dior For Men and Women</h2>
              </div>
              {
                this.state.cosmetic.map((c) => {
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

        </div>
      </>
    )

  }


}

export default Dior