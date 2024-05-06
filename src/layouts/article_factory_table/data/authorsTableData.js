/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Loader from './../../../examples/loader/loader'

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import button from "assets/theme/components/button";
import data from "layouts/dashboard/components/Projects/data";
import { Link } from "react-router-dom";

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
function dataFun() {


  const [apiData, SetApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const baseURL = `https://lovely-boot-production.up.railway.app`

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${baseURL}/scraper/article_factory/data`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        SetApiData(response.data)
        setIsLoading(false)
        console.log("Article", response.data)
      } catch (error) {
        console.error(error);
      }
    })()
  }, []);

  useEffect(() => {
    console.log(apiData)
  }, [apiData])

  const row = apiData.map((eachData, index) => {
    if (!isLoading) {
      return {
        title: <Author name={`${eachData?.title}`} />,
        categories: <Function job={`${eachData?.categories}`} />,
        status: (
          // <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
          <Function job={`${eachData?.status}`} />
        ),
        tags: (
          <Function job={`${eachData?.tags}`} />
        ),
        media_image: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            <Link target="_blank">{eachData?.media_image}</Link>
          </SoftTypography>
        ),

        article_url: (
          <Link target="_blank"><Function job={`${eachData?.article_url}`} /></Link>
        ),
        author: (
          <Function job={`${eachData?.author}`} />
        ),
        date_time: (
          <Function job={`${eachData?.date_time}`} />
        ),
        article_content: (
          <Function job={`${eachData?.article_content}`} />
        ),
      }
    }else{
      return {}
    }
  })

  const authorsTableData = {
    columns: [
      { name: "title", align: "left" },
      { name: "categories", align: "left" },
      { name: "status", align: "center" },
      { name: "tags", align: "center" },
      { name: "media_image", align: "center" },
      { name: "article_url", align: "center" },
      { name: "author", align: "center" },
      { name: "date_time", align: "center" },
      { name: "article_content", align: "center" },
    ],

    rows: row
  };
  return authorsTableData
}


export default dataFun;
