import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Link } from "react-router-dom";
import { useTable, useGlobalFilter, useAsyncDebounce, useFilters, useSortBy, usePagination } from 'react-table';

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span className="table_search">
            Search:{' '}
            < input
                className="table_search_input"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}


// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <select
            name={id}
            id={id}
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}


function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 5 }
    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    // Render the UI for your table
    return (
        <>
            <div className="user_table_top">
                <h2 className="user_table_heading">Ad List</h2>
                <div className="table_top_right">
                    <Link to="/admin/dashboard/ad/add/" className="table_add_link">
                        <button className="btn btn_user_add">
                            Add Ad
                        </button>
                    </Link>

                    <GlobalFilter
                        className="global_search"
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                </div>
            </div>
            <hr />

            {/* {headerGroups.map((headerGroup) =>
                headerGroup.headers.map((column) =>
                    column.Filter ? (
                        <div key={column.id}>
                            <label for={column.id}>{column.render("Header")}: </label>
                            {column.render("Filter")}
                        </div>
                    ) : null
                )
            )} */}

            {/* table */}
            <div className="table_wrapper">
                <Scrollbars
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={1000}
                >
                    <table className="table_border" {...getTableProps()} >

                        <thead className="table_title">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render("Header")}
                                            {/* sorting */}
                                            <span>
                                                &nbsp;

                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? (<i className="fas fa-sort-down"></i>)
                                                        : (<i className="fas fa-sort-up"></i>)
                                                    : (<i className="table_sort_icon fas fa-sort"></i>)
                                                }
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody className="table_body" {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Scrollbars>
            </div>

            {/* pagination section */}
            <div className="pagination">
                <div className="bottom_left_table">
                    <span className="page_number">
                        Page{' '}
                        <strong>
                            {state.pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>

                    <select
                        className="page_options"
                        value={state.pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 20, 50, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="button_right_table">
                    <button className="pagination_button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}
                    <button className="pagination_button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}
                    {/* <span> Go to page : {' '}
                        <input type="number" defaultValue={state.pageIndex + 1}
                            onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }}
                        />
                    </span> */}
                    <button className="pagination_button" onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}
                    <button className="pagination_button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>{' '}

                </div>


            </div>


            {/* <div>
                <pre>
                    <code>{JSON.stringify(state, null, 2)}</code>
                </pre>
            </div> */}
        </>
    );
}

export default Table;