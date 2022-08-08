import React, { Component } from 'react'
import axios from "axios";
import './Order.css'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';


class MyOrder extends Component {
    state = {
        mycheckout: [],
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/mycheckout/myorder`, this.state.config)
            .then((response) => {
                console.log(response)
                this.setState({
                    mycheckout: response.data.data
                })
            }).catch((err) => {
                console.log(err);
            })
    }


    render() {
        var order = <>
            <div className="mainUser">
                <div className="container">
                    <div className="row">
                        <Sidebar></Sidebar>
                        <div className="cardSection col-xl-10 col-lg-10 col-md-9 col-sm-12 ">
                            <div className="page-content page-container" id="page-content">
                                <div className="padding">
                                    <div className="row container d-flex justify-content-center">
                                        <div className="col-12">
                                            <div className="card user-card-full profileCard">
                                                <div className="container-fluid mt-100">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="card myorder-card">
                                                                <div className="card-body">
                                                                    <div className="active-member">
                                                                        <div className="table-responsive">
                                                                            <table className="table table-xs mb-0">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th>Product</th>
                                                                                        <th>Quantity</th>
                                                                                        <th>Status</th>
                                                                                        <th>Payment</th>
                                                                                        <th>Review</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                < tbody >
                                                                                    {
                                                                                        this.state.mycheckout.map((p) => {
                                                                                            return (<>
                                                                                                {
                                                                                                    p.productinfo.myproduct.map((rating) => {
                                                                                                        return (<>
                                                                                                            <tr>
                                                                                                                <td>{rating.productname}</td>
                                                                                                                <td>{rating.productquantity}</td>
                                                                                                                <td>
                                                                                                                    {rating.status}
                                                                                                                </td>
                                                                                                                <td> {rating.paymentmethod}</td>
                                                                                                                <td><Link to={"/user/myorder/rating/" + rating.productid} >Details</Link></td>
                                                                                                            </tr>
                                                                                                        </>

                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </tbody>

                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
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


export default MyOrder