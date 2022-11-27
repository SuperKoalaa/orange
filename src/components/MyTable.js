import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import Button from "@mui/material/Button";
import Amplify from "aws-amplify";
import { API } from "aws-amplify";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

/* 
//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    address: "32188 Larkin Turnpike",
    city: "Charleston",
    state: "South Carolina",
  },
  {
    name: {
      firstName: "Ken",
      lastName: "Chen",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Ken",
      lastName: "Chen",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Ken",
      lastName: "Chen",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Ken",
      lastName: "Chen",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Ken",
      lastName: "Chen",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Ken",
      lastName: "Chen",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Ken",
      lastName: "Chen",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Ken",
      lastName: "Chen",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Ken",
      lastName: "Chen",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
];
*/

const Example = () => {
  //should be memoized or stable
  const testcolumns = useMemo(
    () => [
      {
        accessorKey: "firstname", //access nested data with dot notation
        header: "First Name",
      },
      {
        accessorKey: "lastname",
        header: "Last Name",
      },
      {
        accessorKey: "message", //normal accessorKey
        header: "Message",
      },
    ],
    []
  );

  // Get the data from AWS API Gateway
  const getData = async () => {
    const apiName = "orangeAPI";
    const path = "/ProductTest";
    const myInit = {
      headers: {}, // OPTIONAL
    };

    const get_all = await API.get(apiName, path, myInit);
    console.log(get_all.data);
    setTableData(get_all.data);
    // return API.get(apiName, path, myInit);
  };
  // -------------------

  // Get the Date from AWS API Gateway, which stroe on DynamoDB
  const [tableData, setTableData] = useState([]);

  //Get the data from AWS DynamoDB
  const loadTableData = async () => {
    // Query the API Gateway
    const resp = await fetch(
      "https://7oagrqrvkl.execute-api.ap-southeast-2.amazonaws.com/Production_Test/customerinfo"
    );
    let jsonData = await resp.json();
    console.log("I am load", jsonData);
    // Assign response data to our state variable
    setTableData(jsonData);
  };

  useEffect(() => {
    // Load the data from the API Gateway
    // loadTableData();
    getData();
  }, []);

  return (
    <>
      {/* Table with local data */}
      {/* <MaterialReactTable columns={columns} data={data} enableStickyHeader /> */}
      {/* Table with DynamoDB data */}
      <h1> Get Method - Get Data From DynamoDB</h1>
      <MaterialReactTable
        columns={testcolumns}
        data={tableData}
        enableStickyHeader
      />
    </>
  );
};

export default Example;
