import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';
import Table, { SelectColumnFilter } from './Table';

export default function AdTable() {
    const columns = React.useMemo(
        () => [
            {
                Header: "Ad Image",
                accessor: "landingimage",
                Cell: ({ cell: { value } }) => (
                    <>
                        <img className="ad_table_img"
                            src={`${process.env.REACT_APP_BACKEND_URL}/landingAd/` + value} alt={value}
                        />
                    </>
                )
            },
            {
                Header: "Delete Ad",
                accessor: "_id",
                Cell: ({ cell: { value } }) => (
                    <div className="">
                        <button className="btn view_btn delete_btn" onClick={() => deleteAd(value)}>  Delete</button>
                    </div >
                )
            },
        ], []);

    // here you set a state to tell the component it need to wait
    //  until the result is fetched from the api
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            await axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/landing/show/all`)
                .then((response) => {
                    console.log(response.data.data)
                    setData(response.data.data)
                    setLoadingData(false);
                })
        }
        if (loadingData) {
            // if the result is not ready so you make the axios call
            getData();
        }
    }, [loadingData])

    const deleteAd = async (id) => {
        // e.preventDefault();
        try {
            await axios
                .delete(`${process.env.REACT_APP_BACKEND_URL}/admin/ad/delete/${id}`)
                .then((response) => {
                    toast.success('Ad Deleted.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => { window.location.href = "/admin/dashboard" }, 5010);
                })
                .catch((err) => {
                    toast.error('Failed to delete.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })

        } catch (err) {
        }
    };


    return (
        <div className="AdTable">
            <div className="table_sections">
                {loadingData ? (<p>Loading Please wait...</p>)
                    :
                    (<Table columns={columns} data={data} />)
                }
            </div>
        </div>
    )
}
