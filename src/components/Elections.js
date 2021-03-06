import React, { useEffect, useState } from 'react'
// import { ElectionsData } from './ElectionsData';
import ElectionTable, { Detail, StatusPill } from './ElectionsTable'
import axios from 'axios'

export default function Election() {

    const [elections, setElections] = useState([]);

    const getElections = async () => {
        const result = await axios.get('localhost:8080/elections');
        setElections(result.data.data);
    }

    useEffect(() => {
        getElections()
    }, []);

    const columns = React.useMemo(() =>
        [
            // {
            //     Header: "No.",
            //     accessor: "num",
            // },
            {
                Header: "Election Name",
                accessor: "name",
            },
            {
                Header: "Time Remaining",
                accessor: "time",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: StatusPill,
            },
            {
                Header: "",
                accessor: "details",
                Cell: Detail,
            },
        ],
        []);

    return (
        <div class="min-h-screen w-full bg-white-800 flex flex-col justify-center items-center py-4 px-4 lg:px-8">
            <div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700">
                <ElectionTable columns={columns} data={elections} />
            </div>
        </div>
    )
}