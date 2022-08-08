import { Avatar } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import '../Card/style.css';
import StatusPill from './StatusPill';
import Table, { SelectColumnFilter } from './Table';

export default function ProductRequested() {

    const columns = React.useMemo(
        () => [
            {
                Header: "Image",
                accessor: "img",
                Cell: ({ cell: { value } }) => (
                    <>
                        <Avatar className="user_table_avatar"
                            src={`${process.env.REACT_APP_BACKEND_URL}/userImg/` + value} alt={value}
                        />
                    </>
                )
            },

            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Product Name",
                accessor: "productName",
            },
            {
                Header: "Type",
                accessor: "productType",
            },
            {
                Header: "Requested Date",
                accessor: "requestedDate",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: StatusPill
            },
            {
                Header: "View Details",
                accessor: "_id",
                Cell: ({ cell: { value } }) => (
                    <div className="">
                        <Link to={"/admin/dashboard/product/request/details/" + value}> <button className="btn view_btn">View Details</button></Link>
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
                .get(`${process.env.REACT_APP_BACKEND_URL}/admin/product/request/all`)
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


    return (
        <div className="ProductRequested">
            <div className="table_sections">
                {loadingData ? (<p>Loading Please wait...</p>)
                    :
                    (<Table columns={columns} data={data} />)
                }
            </div>
        </div>
    )
}
