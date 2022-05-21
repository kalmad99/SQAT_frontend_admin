import React, { useState, useEffect } from "react";
import UsersTable, { Detail } from "./VotersTable";
// import { VotersData } from './VotersData';
import axios from 'axios'
// import { SpinnerCircularFixed } from "spinners-react";
// import StudentContract from "../contracts/AAiTStudent.json";
// import { useAPIContract } from "../hooks/useAPIContract";
// import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

export default function Voters() {

  const [voters, setVoters] = useState([]);

  const getVoters = async () => {
      const result = await axios.get('localhost:8080/voters');
      setVoters(result.data);
  }

  useEffect(() => {
      getVoters()
  }, []);


  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "fullName",
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
        Header: "",
        accessor: "details",
        Cell: Detail,
      },
    ],
    []
  );

  return (
    <div class="min-h-screen w-full bg-white-800 flex flex-col justify-center items-center py-4 px-4 lg:px-8">
      {/* {isGetAllVotersLoading && (
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
      {getVotersError && (
        <div>
          <h3>Ooops something went wrong</h3>
          <h2>{getVotersError.message}</h2>
        </div>
      )} */}
      {/* {votersData && votersData.length !== 0 ( */}
      <div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700">
        <UsersTable
          columns={columns}
          data={voters}
          // data={fetchAllVoters(votersData)}
        />
      </div>
    </div>
  );
}
