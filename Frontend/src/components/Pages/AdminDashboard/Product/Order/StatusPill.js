import React from 'react';

export default function StatusPill({ value }) {
    const status = value ? value : "unknown";

    var status_class;

    if (status === "Delivered") {
        return status_class = <>
            <span className="active_pill"> {status} </span>
        </>
    }
    else if (status === "Cancelled") {
        return status_class = <>
            <span className="banned_pill"> {status} </span>
        </>
    }
    else if (status === "Pending" || status === "Shipped") {
        return status_class = <>
            <span className="suspended_pill"> {status} </span>
        </>
    }
    return (
        { status_class }
    )
}
