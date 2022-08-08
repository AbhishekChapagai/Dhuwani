import { Component } from "react";
import './Footer.css'


class Footer extends Component {
    render() {
        return (
            <div>
                {/* <!-- Site footer --> */}
                <footer class="site-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <h6>About</h6>
                                <p class="text-justify">Dhuwani.com
                                is Nepal's first Internatonal Dropshipping Company allowing consumers to get
                                hands on branded cosmetic products from Dior, Chanel, Louis Vuitton etc. and gadgets
                                like laptops and cameras that are not available in Nepali market. With the help of dhuwani
                                 user can not only browse products from our site but can also make a request for a 
                                 product (Cosmetics, Laptops and Cameras) to be 
                                imported for them. Happy Shopping !</p>
                            </div>

                            <div class="col-xs-6 col-md-3">
                                <h6>Quick Links</h6>
                                <ul class="footer-links">
                                    <li><a href="/about">About Us</a></li>
                                    <li><a href="/">Contact Us</a></li>
                                    <li><a href="/">Privacy Policy</a></li>
                                    
                                </ul>
                            </div>
                        </div>
                        {/* <hr> */}
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8 col-sm-6 col-xs-12">
                                <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by&nbsp;
                                <a href="#">dhuwani.com</a>.
                                 </p>
                            </div>
                            <div class="col-md-4 col-sm-6 col-xs-12">
                                <ul class="social-icons">
                                    <li><a class="facebook" href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a class="twitter" href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a class="dribbble" href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a class="linkedin" href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer;