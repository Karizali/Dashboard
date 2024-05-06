/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import axios from "axios";
import { useEffect, useState,useContext } from "react";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import button from "assets/theme/components/button";
import data from "layouts/dashboard/components/Projects/data";

function Author({ image, name, email }) {


  return (
    <>

      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        {/* <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox> */}
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography variant="button" fontWeight="medium">
            {name}
          </SoftTypography>
          <SoftTypography variant="caption" color="secondary">
            {email}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}
function dataFun(){

  
  const [apiData,SetApiData]=useState([{Key1:"abc"}]);

  const baseURL = `https://lovely-boot-production.up.railway.app`

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${baseURL}/scraper/grants_gov/data`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        SetApiData(response.data)
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    })()
  }, []);

  useEffect(()=>{
    console.log(apiData)
 
  },[apiData])
  
const row= apiData.map((eachData,index)=>{
return {
  "Opportunity Title": <Author name={`${eachData["Opportunity Title"]}`}/>,
  "Opportunity Number": (
    <Function job={`${eachData["Opportunity Number"]}`} />
  ),
  "Opportunity Status": (
    <Function job={`${eachData["Opportunity Status"]}`} />
  ),
  url: (
    <Function job={`${eachData.url}`} />
  ),
  "Posted Date": (
    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
      {eachData["Posted Date"]}
    </SoftTypography>
  ),
  "Close Date": <Function job={`${eachData["Close Date"]}`} />,
  status: (
    <Function job={`${eachData.status}`} />
  ),
}
})

  const authorsTableData = {
    columns: [
      { name: "Opportunity Title", align: "left" },
      { name: "Opportunity Number", align: "left" },
      { name: "Opportunity Status", align: "center" },
      { name: "url", align: "center" },
      { name: "Posted Date", align: "center" },
      { name: "Close Date", align: "center" },
      { name: "status", align: "center" },
    ],
  
    rows:row
  };
  return authorsTableData
}


export default dataFun;
