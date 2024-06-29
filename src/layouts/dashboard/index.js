// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import axios from "axios";
import { useSoftUIController, setIsLoading } from '../../context';

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { useEffect, useState } from "react";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  
  const [controller, dispatch] = useSoftUIController();
  const { isLoading } = controller;

  const [dailyLocalwork, setDailyLocalwork] = useState(0);
  const [dailyBatrips, setDailyBatrips] = useState(0);

  const [weelyLocalwork, setWeeklyLocalwork] = useState(0);
  const [weelyBatrips, setWeeklyBatrips] = useState(0);

  const [yearlyLocalwork, setYearlyLocalwork] = useState(0);
  const [yearlyBatrips, setYearlyBatrips] = useState(0);

  const baseURL = `https://dynamic-unity-production.up.railway.app`

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(dispatch, true);
      try {
        const [localworkResponse, batripsResponse, weelyLocalworkResponse, weelyBatripsResponse, yearlyLocalworkResponse, yearlyBatripsResponse] = await Promise.all([
          axios.get(`${baseURL}/daily_localwork`, {
            headers: { 'Content-Type': 'application/json' },
          }),
          axios.get(`${baseURL}/daily_batrips`, {
            headers: { 'Content-Type': 'application/json' },
          }),
          axios.get(`${baseURL}/weekly_localwork`, {
            headers: { 'Content-Type': 'application/json' },
          }),
          axios.get(`${baseURL}/weekly_batrips`, {
            headers: { 'Content-Type': 'application/json' },
          }),
          axios.get(`${baseURL}/yearly_localwork`, {
            headers: { 'Content-Type': 'application/json' },
          }),
          axios.get(`${baseURL}/yearly_batrips`, {
            headers: { 'Content-Type': 'application/json' },
          }),
        ]);

        setDailyLocalwork(localworkResponse.data.data);
        setDailyBatrips(batripsResponse.data.data);

        setWeeklyLocalwork(weelyLocalworkResponse.data.data);
        setWeeklyBatrips(weelyBatripsResponse.data.data);

        setYearlyLocalwork(yearlyLocalworkResponse.data.data);
        setYearlyBatrips(yearlyBatripsResponse.data.data);

        setIsLoading(dispatch, false);
      } catch (error) {
        setIsLoading(dispatch, false);
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={3}>
        <SoftBox mb={3}>

          <h2>Daily Report</h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "Local Works" }}
                count={`Data Scraper Today: ${dailyLocalwork} Rows`} 
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "BA Trips" }}
                count={`Data Scraper Today: ${dailyBatrips} Rows`} 
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
          </Grid>

          <br />
          <h2>Weely Report</h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "Local Works" }}
                count={`Data Scraper this Month: ${weelyLocalwork} Rows`} 
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "BA Trips" }}
                count={`Data Scraper this Month: ${weelyBatrips} Rows`} 
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
          </Grid>

          <br />
          <h2>Annual Report</h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "Local Works" }}
                count={`Data Scraper this Year: ${yearlyLocalwork} Rows`} 
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "BA Trips" }}
                count={`Data Scraper this Year: ${yearlyBatrips} Rows`} 
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
          </Grid>

        </SoftBox>

        {/* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox> */}

        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid> */}
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
