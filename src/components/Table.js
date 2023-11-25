import React, { useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { FiClock } from "react-icons/fi";
import { IoCheckmarkDone } from "react-icons/io5";
function Table({ rowData }) {
    const gridRef = useRef()
    const [columnDefs] = useState([
        {
            headerName: 'Borrower',
            field: 'fname',
            valueGetter: (params) => {
                // Combine first name and last name to create the full name
                return params.data.fname + ' ' + params.data.mname + ' ' + params.data.lname;
            },
        },
        {
            headerName: 'Loan Reference Number',
            field: 'loan_acc_num'
        },
        {
            headerName: 'Orgination Date',
            field: 'loan_start_date',
            valueFormatter: (params) => formatDate(params.value), // Format date
        },
        {
            headerName: 'Status',
            field: 'loan_status',
            cellRenderer: (params) => {
                const statusText = params.value;
                return (
                    <>
                        {statusText === 'Active' ? (
                            <>
                                <div className='inline-flex'>

                                    <IoCheckmarkDone className='text-green-700 my-3.5' />  {/* checkmark icon */}
                                    <span className='text-green-700'>{statusText}</span>
                                </div>
                            </>
                        ) : (
                            <div className="inline-flex"> {/* clock icon */}
                                <FiClock className='text-red-700 my-3.5' />
                                <span className='text-red-700'>{statusText}</span>
                            </div>
                        )}
                    </>
                );
            },
        }
    ])
    const gridOptions = {
        getRowStyle: (params) => {
            // Alternate row colors based on row index
            return params.node.rowIndex % 2 === 0
                ? { background: '#bfdbfe', } // Blue
                : { background: '#f1f5f9', }; // Off blue
        },
        headerClass: 'custom-header-class',
    };
    //   for formate date in form of dd monthname yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };
    const onGridReady = (params) => {
        const { api, columnApi } = params;

        // Adjust the columns to take all the available space
        const columnIds = ['column1', 'column2', 'column3', 'column4'];
        columnIds.forEach((columnId) => {
            columnApi.setColumnWidth(columnId, 'auto');
        });

        // Optional: Fit the columns within the available space
        api.sizeColumnsToFit();
    };
    return (
        <>
            <div className='ag-theme-alpine m-4' style={{ height: 600 }}>
                <AgGridReact
                    onGridReady={onGridReady}
                    ref={gridRef}
                    rowMultiSelectWithClick={true}
                    rowData={rowData}
                    gridOptions={gridOptions}
                    columnDefs={columnDefs}
                    rowSelection='multiple'
                    domLayout='normal'
                    defaultColDef={{ sortable: true, filter: true }}
                    overlayNoRowsTemplate='Please wait while data is being fetched'
                ></AgGridReact>
            </div>
        </>
    )
}

export default Table