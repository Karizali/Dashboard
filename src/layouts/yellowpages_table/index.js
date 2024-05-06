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


// Data
import dataFun from "layouts/yellowpages_table/data/authorsTableData";
import projectsTableData from "layouts/yellowpages_table/data/projectsTableData";



function Yellowpages_table() {
  const { columns, rows } = dataFun();
  const { columns: prCols, rows: prRows } = projectsTableData;
  const baseURL = `https://lovely-boot-production.up.railway.app`
  const [startData, SetStartData] = useState([]);
  const [statusBtn, SetStatusBtn] = useState({available:false});

  const startBtn = () => {

    (async () => {
      try {
        const response = await axios.get(`${baseURL}/scraper/yellowpages/start`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        SetStartData(response?.data)
        console.log(response?.data)
      } catch (error) {
        SetStartData(error?.data)
        console.error(error?.data);
      }

    })()
  }





  const gettingStatus = async () => {
    let mounted = true;
    try {
      const response = await axios.get(`${baseURL}/scraper/yellowpages/status`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (mounted) {
        SetStatusBtn(response?.data);
        console.log(response?.data)
        return () => {
          mounted = false;
        };
      }
      // SetStatusBtn(response)
    } catch (error) {
      if (mounted) {
        SetStatusBtn(error?.data);
        console.log(error)
        return () => {
          mounted = false;
        };
      }
    }

  }
  useEffect(() => {
    
    const interval = setInterval(() => {
      gettingStatus();
    }, 1000)
    return () => clearInterval(interval)
  }, []);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Yellow Pages table</SoftTypography>
            </SoftBox>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <div><Button onClick={startBtn} variant="outlined" style={{ color: "blue", cursor: "pointer" }}>Start </Button>{!(statusBtn?.available)?<SoftTypography variant="h6">Not Available</SoftTypography>:<SoftTypography variant="h6">Available</SoftTypography>}</div>
              <SoftTypography variant="h6">Status{`: ${statusBtn?.status}`}</SoftTypography>
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
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Yellowpages_table;
