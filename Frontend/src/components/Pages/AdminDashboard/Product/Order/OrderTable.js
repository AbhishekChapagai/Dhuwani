import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import '../Card/style.css';
import StatusPill from './StatusPill';
import Table, { SelectColumnFilter } from './Table';

export default function OrderTable() {
    const columns = React.useMemo(
        () => [
            {
                Header: "UserID",
                accessor: "userid",
            },
            {
                Header: "Product Order",
                accessor: "totalProduct",
            },
            {
                Header: "Total Amount",
                accessor: "totalAmount",
            },
            {
                Header: "Total Amount(Tax)",
                accessor: "totalAmountTax",
            },

            {
                Header: "Payment Method",
                accessor: "paymentMethod",
            },
            {
                Header: "Order Date",
                accessor: "checkoutDate",
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
                        <Link to={"/admin/dashboard/order/edit/" + value}> <button className="btn view_btn">View Details</button></Link>
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
                .get(`${process.env.REACT_APP_BACKEND_URL}/admin/order/left/details`)
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
        <div className="OrderTable">
            <div className="table_sections">
                {loadingData ? (<p>Loading Please wait...</p>)
                    :
                    (<Table columns={columns} data={data} />)
                }
            </div>
        </div>
    )
}
