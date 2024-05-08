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
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { useSoftUIController, setIsLoading } from './../../context/index';
import PaginationControlled from "./../../components/Pagination";
import PropTypes from 'prop-types';

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Loader from './../../examples/loader/loader'

// Data
import dataFun from "layouts/article_factory_table/data/authorsTableData";
import projectsTableData from "layouts/article_factory_table/data/projectsTableData";

function Article_factory_table() {

  const [controller, dispatch] = useSoftUIController();
  const { isLoading } = controller;

  const [startData, SetStartData] = useState([]);
  const [sendData, SetSendData] = useState([]);
  const [statusBtn, SetStatusBtn] = useState({ available: false });
  const baseURL = `https://lovely-boot-production.up.railway.app`
  const { columns, rows, paginationData } = dataFun();
  const { columns: prCols, rows: prRows } = projectsTableData;


  const startBtn = () => {

    (async () => {
      try {
        const response = await axios.get(`${baseURL}/scraper/article_factory/start`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        SetStartData(response)
        console.log(response.data)
      } catch (error) {
        SetStartData(error)
        console.error(error.data);
      }

    })()
  }


  const sendBtn = () => {

    (async () => {
      setIsLoading(dispatch, true);
      try {
        const response = await axios.get(`${baseURL}/scraper/article_factory/send`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        SetSendData(response)
        Swal.fire({
          icon: "success",
          title: "Start successfully",
          text: response.data.status,
        });
        setIsLoading(dispatch, false);
        console.log(response.data)
      } catch (error) {
        SetSendData(error.data)
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




  const gettingStatus = async () => {
    let mounted = true;
    try {
      const response = await axios.get(`${baseURL}/scraper/article_factory/status`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (mounted) {
        SetStatusBtn(response?.data);
        console.log(response?.data)
      }
      // SetStatusBtn(response)
    } catch (error) {
      if (mounted) {
        SetStatusBtn(error?.data);
        console.log(error)
      }
    }
    return () => {
      mounted = false;
    };

  }

  useEffect(() => {
    const getStatus = async () => {
      await gettingStatus();
      setTimeout(getStatus, 1000);
    };

    getStatus();

    return () => {
      clearTimeout(getStatus);
    };
  }, []);

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
                    <SoftTypography variant="h6">Article factory table</SoftTypography>

                  </SoftBox>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <div>
                      <Button onClick={startBtn} variant="outlined"
                        style={{ color: "blue", cursor: "pointer" }}>Start </Button>
                      {
                        !(statusBtn.available)
                          ?
                          <SoftTypography variant="h6">Not Available</SoftTypography>
                          :
                          <SoftTypography variant="h6">Available</SoftTypography>
                      }
                    </div>
                    <div>
                      <Button
                        onClick={sendBtn}
                        variant="outlined"
                        style={{ color: "blue", cursor: "pointer",marginBottom:30 }}
                      >Send
                      </Button>
                      <SoftTypography variant="h6" ></SoftTypography>
                    </div>
                    <SoftTypography variant="h6">Status{`: ${statusBtn.status}`}</SoftTypography>
                    <SoftTypography variant="h6"></SoftTypography>
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

Article_factory_table.propTypes = {
  paginationData: PropTypes.object.isRequired
};



export default Article_factory_table;
