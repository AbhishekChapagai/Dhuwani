import React, { Component } from 'react';
import "./style.css"

export default class NotFoundPage extends Component {
    render() {
        return (
            <div className="NotFound">
                <div className="container">
                    <div className="N_container">
                        <div className="N_border">
                            <div className="N_content">
                                404 | Page Not Found
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
