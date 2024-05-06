/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";

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

  
  const [apiData,SetApiData]=useState([]);

  const baseURL = `https://lovely-boot-production.up.railway.app`

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${baseURL}/scraper/yellowpages/data`, {
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
    // console.log(state.isLogin)
  },[apiData])
  
const row= apiData.map((eachData,index)=>{
return {
  name: <Author name={`${eachData.name}`}/>,
  address: <Function job={`${eachData.address}`} />,
  status: (
    // <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
    <Function job={`${eachData.status}`} />
  ),
  phone: (
    <Function job={`${eachData.phone}`} />
  ),
  link: (
    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
      <Link target="_blank">{eachData.link}</Link>
    </SoftTypography>
  ),
}
})

  const authorsTableData = {
    columns: [
      { name: "name", align: "left" },
      { name: "address", align: "left" },
      { name: "status", align: "center" },
      { name: "phone", align: "center" },
      { name: "link", align: "center" },
      // { name: "action", align: "center" },
    ],
  
    rows:row
  };
  return authorsTableData
}


export default dataFun;
