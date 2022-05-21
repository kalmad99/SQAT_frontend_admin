import React, { useState, useEffect } from 'react'
import CandidatesTable, { Detail, Lock, StatusPill, FullName } from './CandidatesTable'
// import candidatesData from './CandidatesData'
import axios from 'axios'
// import { SpinnerCircularFixed } from "spinners-react";
// import StudentContract from "../contracts/AAiTStudent.json";
// import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
// import { candidatesData } from './CandidatesData'

export default function Candidates() {

    const [candidates, setCandidates] = useState([]);

    const getCandidates = async () => {
        const result = await axios.get('localhost:8080/candidates');
        setCandidates(result.data);
    }

    useEffect(() => {
        getCandidates()
    }, []);
    

    const columns = React.useMemo(() =>
        [
            {
                Header: "Name",
                accessor: "fullName"
            },
            {
                Header: "Section",
                accessor: "section",
            },
            {
                Header: "Year",
                accessor: "year",
            },
            {
                Header: "Department",
                accessor: "dept",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: StatusPill,
            },
            {
                Header: "",
                accessor: "lock",
                Cell: Lock,
            },
            {
                Header: "",
                accessor: "_id",
                Cell: Detail,
            },
        ],
        []);

    return (
        <div class="min-h-screen w-full bg-white-800 flex flex-col justify-center items-center py-4 px-4 lg:px-8">
            {/* {isGetAllCandidatesLoading && (
                <div>
                    <SpinnerCircularFixed
                        size={50}
                        thickness={100}
                        speed={100}
                        color="#36ad47"
                        secondaryColor="rgba(0, 0, 0, 0.44)"
                    />
                </div>
            )}
            {getCandidatesError && (
                <div>
                    <h3>Ooops something went wrong</h3>
                    <h2>{getCandidatesError.message}</h2>
                </div>
            )} */}
            < div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700">
                <CandidatesTable columns={columns} data={candidates} />
            </div>
        </div >
    )
}