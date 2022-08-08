import React, { Component } from 'react'
import axios from "axios";
import './bar.css'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';



class ProgressBar extends Component {



    render() {
        var order = <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bg-white p-2 border rounded px-3">
                            <div className="d-flex flex-row justify-content-between align-items-center order">
                                <div className="d-flex flex-column order-details"><span>Your order has been Placed</span><span className="date">by DHFL on 21 Jan, 2020</span></div>
                            </div>
                            <hr className="divider mb-4" />
                            <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                                <span className="d-flex justify-content-center align-items-center big-dot dot"><i className="fa fa-check text-white"></i></span>
                                <hr className="flex-fill uncheck-track" /><span className="uncheck-dot"></span>
                                <hr className="flex-fill uncheck-track" /><span className="uncheck-dot"></span>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <div className="d-flex flex-column justify-content-center align-items-center"><span>15 Mar</span><span>Order Dispatched</span></div>
                                <div className="d-flex flex-column align-items-center"><span>15 Mar</span><span>Out for delivery</span></div>
                                <div className="d-flex flex-column align-items-end"><span>15 Mar</span><span>Delivered</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bg-white p-2 border rounded px-3">
                            <div className="d-flex flex-row justify-content-between align-items-center order">
                                <div className="d-flex flex-column order-details"><span>Your order has Reached Nepal</span><span className="date">by DHFL on 21 Jan, 2020</span></div>
                            </div>
                            <hr className="divider mb-4" />
                            <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                                <span className="d-flex justify-content-center align-items-center big-dot dot"><i className="fa fa-check text-white"></i></span>
                                <hr className="flex-fill track-line" /> <span className="d-flex justify-content-center align-items-center big-dot dot"><i className="fa fa-check text-white"></i></span>
                                <hr className="flex-fill uncheck-track" /><span className="uncheck-dot"></span>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <div className="d-flex flex-column justify-content-center align-items-center"><span>15 Mar</span><span>Order Dispatched</span></div>
                                <div className="d-flex flex-column align-items-center"><span>15 Mar</span><span>Out for delivery</span></div>
                                <div className="d-flex flex-column align-items-end"><span>15 Mar</span><span>Delivered</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bg-white p-2 border rounded px-3">
                            <div className="d-flex flex-row justify-content-between align-items-center order">
                                <div className="d-flex flex-column order-details"><span>Your order has been Delivered </span><span className="date">by DHFL on 21 Jan, 2020</span></div>
                            </div>
                            <hr className="divider mb-4" />
                            <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                                <span className="d-flex justify-content-center align-items-center big-dot dot"><i className="fa fa-check text-white"></i></span>
                                <hr className="flex-fill track-line" /> <span className="d-flex justify-content-center align-items-center big-dot dot"><i className="fa fa-check text-white"></i></span>
                                <hr className="flex-fill track-line" /><span className="d-flex justify-content-center align-items-center big-dot dot"><i className="fa fa-check text-white"></i></span>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <div className="d-flex flex-column justify-content-center align-items-center"><span>15 Mar</span><span>Order Dispatched</span></div>
                                <div className="d-flex flex-column align-items-center"><span>15 Mar</span><span>Out for delivery</span></div>
                                <div className="d-flex flex-column align-items-end"><span>15 Mar</span><span>Delivered</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
        return (
            order
        )
    }
}


export default ProgressBar