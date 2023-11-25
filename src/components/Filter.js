import React, { useState } from 'react'
import data from '../Data.json'
function Filter({ setRowData }) {
    // Get the current date in "YYYY-MM-DD" format
    const currentDate = new Date().toISOString().split('T')[0]

    const [totalDisbursed] = useState(data.response.reduce((total, loan) => {
        return total + (loan.disbursed_amt || 0); // Use 0 if disbursed_amt is null
    }, 0));
    const [activeLoans,] = useState(data.response.filter(loan => loan.loan_status === 'Active').length); // count the active loans
    const [accountsOpenTOday] = useState(data.response.filter(loan => loan.loan_created_at.split(' ')[0] === currentDate).length); // count the accounts opened today

    const [selectedDateOption, setSelectedDateOption] = useState('all');

    const handleOnChangeSearch = (e) => {
        // console.log(e.target.value); for checking value
        let value = e.target.value.toLowerCase();

        // Use filter to find matching records based on full name
        let result = data.response.filter((item) => {
            const fullName = `${item.fname} ${item.lname}`.toLowerCase();
            return fullName.includes(value);
        });
        // console.log(result) for checking result
        setRowData(result)
    }
    const handleDateOptionChange = (e) => {
        setSelectedDateOption(e.target.value);

        applyFilters(e.target.value);
    };

    const applyFilters = (dateOption) => {
        let filteredData = data.response;

        // Apply date filter based on the selected option
        if (dateOption === 'today') {
            const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
            filteredData = filteredData.filter((item) => item.loan_created_at.split(' ')[0] === today);
        } else if (dateOption === 'lastWeek') { // last week
            const today = new Date(); // Get today's date
            const lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7); // Get the date of last week's start
            const formattedLastWeekStart = lastWeekStart.toISOString().split('T')[0];
            filteredData = filteredData.filter(
                (item) => item.loan_created_at.split(' ')[0] >= formattedLastWeekStart
            );
        }
        else if (dateOption === 'thisMonth') { // this month
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            const formattedStartOfMonth = startOfMonth.toISOString().split('T')[0];
            filteredData = filteredData.filter(
                (item) => item.loan_created_at.split(' ')[0] >= formattedStartOfMonth
            );
        } else if (dateOption === 'last3Months') { // last 3 months
            const today = new Date();
            const last3MonthsStart = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
            const formattedLast3MonthsStart = last3MonthsStart.toISOString().split('T')[0]; // Get the date of last 3 months' start
            filteredData = filteredData.filter(
                (item) => item.loan_created_at.split(' ')[0] >= formattedLast3MonthsStart
            );
        }

        setRowData(filteredData);
    };
    return (
        <>
            <div className='flex justify-around text-blue-500 font-medium'>
                {/* <input type="text" onChange={handleOnChangeSearch} className='bg-blue-500' /> */}
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm rounded-lg border border-gray-600" onChange={handleOnChangeSearch} placeholder="Search..." required />
                </div>
                <div>
                    <p>Total Disbursed</p>
                    <p>Rs. {totalDisbursed}</p>
                </div>
                <div>
                    <p>Active Loans</p>
                    <p>{activeLoans}</p>
                </div>
                <div>
                    <p>Accounts Open Today</p>
                    <p>{accountsOpenTOday}</p>
                </div>
                <select name="" id="" value={selectedDateOption} onChange={handleDateOptionChange}>
                    <option value="all">All</option>
                    <option value="today">Today</option>
                    <option value="thisMonth">This Month</option>
                    <option value="lastWeek">Last Week</option>
                    <option value="last3Months">Last 3 Months</option>
                </select>
            </div>
        </>
    )
}

export default Filter