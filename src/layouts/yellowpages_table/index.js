/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { useSoftUIController, setIsLoading } from './../../context/index';
import PaginationControlled from "./../../components/Pagination";
import PropTypes from 'prop-types';



// Data
import dataFun from "layouts/yellowpages_table/data/authorsTableData";
import projectsTableData from "layouts/yellowpages_table/data/projectsTableData";
import Loader from './../../examples/loader/loader'



function Yellowpages_table() {

  const [controller, dispatch] = useSoftUIController();
  const { isLoading } = controller;
  const baseURL = `https://lovely-boot-production.up.railway.app`


  const [startData, setStartData] = useState([]);
  const [sendData, setSendData] = useState([]);
  const [statusBtn, setStatusBtn] = useState({ available: false });
  const [deleteData, setDeleteData] = useState([]);
  const [checkStatus, setCheckStatus] = useState(false);


  const { columns, rows, paginationData, SetIsDeleteOrStart, isDeleteOrStart } = dataFun();
  const { columns: prCols, rows: prRows } = projectsTableData;




  const sendBtn = () => {

    (async () => {
      setIsLoading(dispatch, true);
      try {
        const response = await axios.get(`${baseURL}/scraper/yellowpages/send`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setSendData(response.data)
        Swal.fire({
          icon: "success",
          title: "Send successfully",
          text: response.data,
        });
        setIsLoading(dispatch, false);
        console.log(response.data)
      } catch (error) {
        setSendData(error.data)
        Swal.fire({
          icon: "error",
          title: "Error occur",
          text: error.data,
        });
        setIsLoading(dispatch, false);
        console.error(error.data);
      }

    })()
  }

  const deleteBtn = () => {

    (async () => {
      setIsLoading(dispatch, true);
      try {
        const response = await axios.get(`${baseURL}/scraper/yellowpages/clean`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setDeleteData(response)
        Swal.fire({
          icon: "success",
          title: "Delete Response",
          text: response.data.status,
        });
        setIsLoading(dispatch, false);
        SetIsDeleteOrStart(!isDeleteOrStart);
        console.log(response.data)
      } catch (error) {
        setDeleteData(error.data)
        Swal.fire({
          icon: "error",
          title: "Error occur",
          text: error.data,
        });
        SetIsDeleteOrStart(!isDeleteOrStart);
        setIsLoading(dispatch, false);
        console.error(error.data);
      }

    })()
  }



  const gettingStatus = async () => {
    try {
      const response = await axios.get(`${baseURL}/scraper/yellowpages/status`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setStatusBtn(response.data);
      console.log(response.data);

      if (!response.data.available) {
        setCheckStatus(true); // Stop checking if the status is already true and checkStatus is true
      }
      if (response.data.available) {
        setCheckStatus(false); // Stop checking if the status is already true and checkStatus is true
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (!checkStatus) {
      gettingStatus(); // Start checking status initially
    }
  }, []);

  useEffect(() => {
    let intervalId;

    const getStatusEvery2sec = async () => {
      await gettingStatus();
      intervalId = setTimeout(getStatusEvery2sec, 2000);
    };

    if (checkStatus) {
      getStatusEvery2sec();
    } else {
      clearTimeout(intervalId); // Clear the timeout if status becomes true or if it's already true
    }

    return () => {
      clearTimeout(intervalId);
    };
  }, [checkStatus]);




  const startBtn = async () => {
    console.log("Start button clicked");
    if (statusBtn.available) {
      try {
        console.log("Sending start request");
        const response = await axios.get(`${baseURL}/scraper/yellowpages/start`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setStartData(response.data);
        if (!response.data.available) {
          setCheckStatus(true);
        }
        console.log(response.data.available);
        // Update checkStatus based on the response
      } catch (error) {
        console.error(error);
      }
    }
  };



  return (
    <DashboardLayout>
      <DashboardNavbar />
      {(!isLoading) ?
        <SoftBox py={3}>
          <SoftBox mb={3}>
            {
              (rows) ?
                <Card>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <SoftTypography variant="h6">Yellowpages table</SoftTypography>
                  </SoftBox>
                  {
                    (statusBtn.available)
                      ?
                      <SoftBox display="flex" justifyContent="space-between" alignItems="center" py={1} px={3}>

                        <Button

                          onClick={startBtn}
                          variant="outlined" size="medium"
                          style={{ color: "blue", cursor: "pointer" }}>Start
                        </Button>

                        <Button

                          onClick={sendBtn}
                          variant="outlined"
                          size="medium"
                          style={{ color: "blue", cursor: "pointer" }}
                        >Send
                        </Button>
                        <Button

                          onClick={deleteBtn}
                          variant="outlined"
                          size="medium"
                          style={{ color: "red", cursor: "pointer" }}
                        >Delete
                        </Button>
                        <SoftTypography variant="h5">Status{`: `}
                          <div
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 50,
                              margin: 10,
                              backgroundColor: "green"
                            }}
                          ></div>
                        </SoftTypography>

                      </SoftBox>
                      :
                      <SoftBox display="flex" justifyContent="space-between" alignItems="center" py={1} px={3}>

                        <Button
                          disabled
                          onClick={startBtn}
                          variant="outlined" size="medium"
                          style={{ color: "blue", cursor: "pointer" }}>Start
                        </Button>

                        <Button
                          disabled
                          onClick={sendBtn}
                          variant="outlined"
                          size="medium"
                          style={{ color: "blue", cursor: "pointer" }}
                        >Send
                        </Button>
                        <Button
                          disabled
                          onClick={deleteBtn}
                          variant="outlined"
                          size="medium"
                          style={{ color: "red", cursor: "pointer" }}
                        >Delete
                        </Button>
                        <SoftTypography variant="h5">Status{`: `}

                          <div
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 50,
                              margin: 10,
                              backgroundColor: "red"
                            }}
                          ></div>
                        </SoftTypography>

                      </SoftBox>

                  }
                  <SoftBox display="flex" justifyContent="space-between" alignItems="center" py={1} px={3}>
                    {
                      !(statusBtn?.available) ?
                        <SoftTypography variant="h7" color="error">Not Available</SoftTypography> :
                        <SoftTypography variant="h7" color="success">Available</SoftTypography>
                    }

                  </SoftBox>
                  <SoftBox
                    sx={{
                      "& .MuiTableRow-root:not(:last-child)": {
                        "& td": {
                          borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                            `${borderWidth[1]} solid ${borderColor}`,
                        },
                      },
                    }}
                  >
                    <Table columns={columns} rows={rows} />
                  </SoftBox>
                </Card> :
                <Loader />
            }
          </SoftBox>
          {/* <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Projects table</SoftTypography>
          </SoftBox>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </SoftBox>
        </Card> */}
          <SoftBox display="flex" justifyContent="center" alignItems="center">
            <Stack spacing={2}>
              <PaginationControlled paginationData={paginationData} />
            </Stack>
          </SoftBox>
        </SoftBox>
        :
        <Stack spacing={2}>
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="rounded" height={200} />
        </Stack>
      }
      <Footer />
    </DashboardLayout>
  );
}

Yellowpages_table.propTypes = {
  paginationData: PropTypes.object.isRequired
};
export default Yellowpages_table;
