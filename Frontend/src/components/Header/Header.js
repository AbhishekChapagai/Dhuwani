import '@szhsin/react-menu/dist/index.css';

import React from "react";
import { Component } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import './Header.css';
import ProfileMenu from './ProfileMenu';
import axios from 'axios';
import { Avatar } from '@material-ui/core';


class Header extends Component {

  state = {
    firstName: "",
    lastName: "",
    img: "",
    config: {
      headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
    }
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/token/decode`, this.state.config)
      .then((response) => {
        const data = response.data
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          img: data.img
        })
      }).catch((err) => {
        console.log(err);
      })
  }

  logout = () => {
    localStorage.clear();
    window.location.href = '/'
  }

  render() {
    if (localStorage.getItem('userType') === 'User') {
      if (localStorage.getItem('verified') === 'true') {
        var navbar = <>
          <Navbar collapseOnSelect expand="md">
            <Container>
              <Navbar.Brand href="/"> <i className="fas fa-paper-plane"></i> dhuwani</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />

              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto mb-1">
                  <LinkContainer exact to="/user/profile" className="mobile_show">
                    <Nav.Link>
                      <div className="nav_profile_link">
                        <div className="nav_profile_icon">
                          <Avatar src={`${process.env.REACT_APP_BACKEND_URL}/userImg/` + this.state.img} />
                        </div>

                        <div className="nav_profile_detatil">
                          <span className="mobile_profile nav_name_mob"> {this.state.firstName} {this.state.lastName} </span>
                          <br />
                          <span className="mobile_profile"> See your Profile </span>
                        </div>
                      </div>
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer exact to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/product" >
                    <NavDropdown title="Product" id="collasible-nav-dropdown">
                      <LinkContainer exact to="/product/cosmetics">
                        <NavDropdown.Item >
                          Cosmetic
                        </NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer exact to="/product/gadgets">
                        <NavDropdown.Item>
                          Gadget
                        </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  </LinkContainer>

                  <LinkContainer exact to="/user/product/request">
                    <Nav.Link>Request Product</Nav.Link>
                  </LinkContainer>

                  <LinkContainer exact to="/cart" className="mobile_show">
                    <Nav.Link>Cart</Nav.Link>
                  </LinkContainer>
                </Nav>

                <Nav>

                  <div className="search_container">
                    <input className="search_input" type="text" placeholder="Search..." />
                    <i className="fas fa-search search_icon_nav"></i>
                  </div>

                  <div className="mobile_hidden nav_profile">
                    <ProfileMenu />
                  </div>

                  <Link>
                    <button type="submit" onClick={this.logout} className="btn btn_p_c mobile_show"><i className="fas fa-sign-out-alt"></i>  Logout </button>
                  </Link>
                </Nav>
              </Navbar.Collapse>

            </Container>
          </Navbar>
        </>
      }
      else {
        navbar = <>
          <Navbar collapseOnSelect expand="sm">
            <Container>
              <Navbar.Brand href="/"> <i className="fas fa-paper-plane"></i> dhuwani</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />

              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto mb-1">
                  <LinkContainer exact to="/profile" className="mobile_show">
                    <Nav.Link>
                      <div className="nav_profile_link">
                        <div className="nav_profile_icon">
                          <Avatar src={`${process.env.REACT_APP_BACKEND_URL}/userImg/` + this.state.img} />
                        </div>

                        <div className="nav_profile_detatil">
                          <span className="mobile_profile nav_name_mob"> {this.state.firstName} {this.state.lastName} </span>
                          <br />
                          <span className="mobile_profile"> See your Profile </span>
                        </div>
                      </div>
                    </Nav.Link>
                  </LinkContainer>

                </Nav>

                <Nav>
                  <div className="mobile_hidden nav_profile">
                    <ProfileMenu />
                  </div>

                  <Link>
                    <button type="submit" onClick={this.logout} className="btn btn_p_c mobile_show"><i className="fas fa-sign-out-alt"></i>  Logout </button>
                  </Link>
                </Nav>
              </Navbar.Collapse>

            </Container>
          </Navbar>
        </>
      }
    }
    else if (localStorage.getItem('userType') === 'Admin') {
      navbar = <>
        <Navbar collapseOnSelect expand="md">
          <Container>
            <Navbar.Brand href="/admin/dashboard"> <i className="fas fa-paper-plane"></i> dhuwani</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto mb-1">
                <LinkContainer exact to="/user/profile" className="mobile_show">
                  <Nav.Link>
                    <div className="nav_profile_link">
                      <div className="nav_profile_icon">
                        <Avatar src={`${process.env.REACT_APP_BACKEND_URL}/userImg/` + this.state.img} />
                      </div>

                      <div className="nav_profile_detatil">
                        <span className="mobile_profile nav_name_mob"> {this.state.firstName} {this.state.lastName} </span>
                        <br />
                        <span className="mobile_profile"> See your Profile </span>
                      </div>
                    </div>
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer exact to="/admin/dashboard">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>

                <LinkContainer exact to="/admin/dashboard/product/add">
                  <Nav.Link>Add Product</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/product" >
                  <NavDropdown title="Product" id="collasible-nav-dropdown">
                    <LinkContainer exact to="/product/cosmetics">
                      <NavDropdown.Item >
                        Cosmetic
                      </NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer exact to="/product/gadgets">
                      <NavDropdown.Item>
                        Gadget
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </LinkContainer>
                <LinkContainer exact to="/cart" className="mobile_show">
                  <Nav.Link>Cart</Nav.Link>
                </LinkContainer>
              </Nav>

              <Nav>

                <div className="search_container">
                  <input className="search_input" type="text" placeholder="Search..." />
                  <i className="fas fa-search search_icon_nav"></i>
                </div>

                <div className="mobile_hidden nav_profile">
                  <ProfileMenu />
                </div>

                <Link>
                  <button type="submit" onClick={this.logout} className="btn btn_p_c mobile_show"><i className="fas fa-sign-out-alt"></i>  Logout </button>
                </Link>
              </Nav>
            </Navbar.Collapse>

          </Container>
        </Navbar>
      </>
    }
    else {
      navbar = <>
        <Navbar collapseOnSelect expand="md">
          <Container>
            <Navbar.Brand href="/"> <i className="fas fa-paper-plane"></i> dhuwani</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto mb-1">
                <LinkContainer exact to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/product" >
                  <NavDropdown title="Product" id="collasible-nav-dropdown">
                    <LinkContainer exact to="/product/cosmetics">
                      <NavDropdown.Item >
                        Cosmetic
                      </NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer exact to="/product/gadgets">
                      <NavDropdown.Item>
                        Gadget
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </LinkContainer>

                <LinkContainer exact to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
              </Nav>

              <Nav>
                <div className="search_container">
                  <input className="search_input" type="text" placeholder="Search..." />
                  <i className="fas fa-search search_icon_nav"></i>
                </div>

                <Link exact to="/login">
                  <button type="submit" className="btn btn_p_c"><i className="fas fa-sign-in-alt"></i>  Login </button>
                </Link>
              </Nav>
            </Navbar.Collapse>

          </Container>
        </Navbar>
      </>
    }

    return (
      <div className="Header">
        {navbar}
      </div >
    )
  }
}


export default Header;