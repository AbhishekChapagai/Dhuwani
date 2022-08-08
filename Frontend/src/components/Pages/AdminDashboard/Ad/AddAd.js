import axios from 'axios';
import React, { Component } from 'react'
import { toast } from 'react-toastify';
toast.configure();

export default class AddAd extends Component {
    state = {
        landingimage: "",
        config: {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    }

    fileHandler = (e) => {
        if (e.target.files.length > 1) {
            return toast.error('Limit exceed! Max 1 imgae.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            this.setState({
                landingimage: e.target.files[0]
            })
        }
    }

    submitData = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('landingimage', this.state.landingimage)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/landing/insert`, data, this.state.config)
            .then((response) => {
                this.setState({
                    success: response.data.success
                })

                toast.success('Ad Added.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((err) => {
                console.log(err.response);

                this.setState({
                    success: err.response.data.success
                })

                toast.error('Failed to add!!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }


    render() {

        return (
            <div className="AddAd">
                <div className="container add_container">
                    <div className="add_border col-10">

                        <div className="add_title">
                            <h2 className="add_heading">
                                Place ads
                            </h2>
                        </div>

                        <div className="add_form_container">
                            <form id="ad_form">
                                <div className="form_heading mt-3">
                                    <h2>Ad Image</h2>
                                    <hr />
                                </div>
                                <div className="col-12 col-sm-6 mb-3">
                                    <div className="form-group file_uploader">
                                        <input id="landingImage" type="file" name="landingimage" className="form-control gadget_image_uploader"
                                            onChange={this.fileHandler} />
                                    </div>
                                </div>

                                <button type="submit" id="btn_ad" className="btn btn_primary_color btn-md btn-block"
                                    onClick={this.submitData}>Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
