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
import { useEffect, useState } from "react";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import dataFun from "layouts/grants_gov_table/data/authorsTableData";
import projectsTableData from "layouts/grants_gov_table/data/projectsTableData";
import axios from "axios";

function Grants_gov_table() {

  const [startData, SetStartData] = useState([]);
  const [statusBtn, SetStatusBtn] = useState([]);
  const baseURL = `https://lovely-boot-production.up.railway.app`
  const { columns, rows } = dataFun();
  const { columns: prCols, rows: prRows } = projectsTableData;

  const startBtn = () => {

    (async () => {
      try {
        const response = await axios.get(`${baseURL}/scraper/grants_gov/start`, {
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

  useEffect(() => {
    if (startData?.data?.available == false) {
      console.log(startData?.data?.available)
    }
  }, [startData])


  const gettingStatus = async () => {
    let mounted = true;
    try {
      const response = await axios.get(`${baseURL}/scraper/grants_gov/status`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (mounted) {
        SetStatusBtn(response);
        console.log(response.data)
        return () => {
          mounted = false;
        };
      }
      // SetStatusBtn(response)
    } catch (error) {
      if (mounted) {
        SetStatusBtn(error);
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


  // useEffect(() => {
  //   let mounted = true;
  //   axios.get('demo/all/').then((res) => {
  //     const allPosts = res.data;
  //     if (mounted) {
  //       setAppState({ loading: false, posts: allPosts });
  //     }

  //   });
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  return (

    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h4">Grants_gov table</SoftTypography>
            </SoftBox>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              {(statusBtn.available == false) ?
                <Button disabled onClick={startBtn} variant="outlined" style={{ color: "blue", cursor: "pointer" }}>Start</Button>
                :
                <Button onClick={startBtn} variant="outlined" style={{ color: "blue", cursor: "pointer" }}>Start</Button>
              }
              <SoftTypography variant="h6">Status</SoftTypography>
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
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Grants_gov_table;
