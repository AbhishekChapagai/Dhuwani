import React, { Component, useContext } from 'react'
import CardBox from './Card/CardBox';
import './style.css';
import UserTable from './User/UserTable';

import { Redirect } from "react-router-dom"; // wrap
import ProductRequested from './Product/ProductRequested/ProductRequested';
import OrderTable from './Product/Order/OrderTable';
import AdTable from './Ad/AdTable';

export default class index extends Component {

    render() {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('userType') === "User") {
                return <Redirect to='/' />
            }
        }
        else {
            return <Redirect to='/login' />
        }

        return (
            <div className="AdminIndex">
                <div className="container">
                    <div className="card_box">
                        <CardBox />
                    </div>
                    <div className="user_table">
                        <UserTable />
                    </div>
                    <div className="product_req_table">
                        <ProductRequested />
                    </div>
                    <div className="order_table">
                        <OrderTable />
                    </div>
                    <div className="ad_table">
                        <AdTable />
                    </div>
                </div>
            </div>
        )
    }
}
