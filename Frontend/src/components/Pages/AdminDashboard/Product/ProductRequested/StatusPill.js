import React from 'react';

export default function StatusPill({ value }) {
    const status = value ? value : "unknown";

    var status_class;

    if (status === "Approved") {
        return status_class = <>
            <span className="active_pill"> {status} </span>
        </>
    }
    else if (status === "Disapproved") {
        return status_class = <>
            <span className="banned_pill"> {status} </span>
        </>
    }
    else if (status === "Pending") {
        return status_class = <>
            <span className="suspended_pill"> {status} </span>
        </>
    }
    return (
        { status_class }
    )
}
