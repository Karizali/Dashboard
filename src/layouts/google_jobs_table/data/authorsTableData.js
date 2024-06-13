/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useSoftUIController, setIsLoading } from './../../../context/index';
import PropTypes from 'prop-types';

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
function dataFun() {


  const [controller, dispatch] = useSoftUIController();
  const { isLoading } = controller;

  const [apiData, SetApiData] = useState([]);
  const [isDeleteOrStart, SetIsDeleteOrStart] = useState(false);
  const [totalPages, SetTotalPages] = useState(10);
  const [pageAndLimit, SetPageAndLimit] = useState({
    page: 1,
    limit: 10
  });

  const baseURL = `https://dynamic-unity-production.up.railway.app`

  useEffect(() => {
    (async () => {
      // console.log(pageAndLimit.page,pageAndLimit.limit)
      setIsLoading(dispatch, true);
      try {
        const response = await axios.get(`${baseURL}/scraper/google_jobs/paginate?page=${pageAndLimit.page}&limit=${pageAndLimit.limit}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        SetTotalPages(response.data.total_pages);
        SetApiData(response.data.data);
        setIsLoading(dispatch, false);
        console.log(response.data.data)

      } catch (error) {
        setIsLoading(dispatch, false);
        console.error(error);
      }
    })()
  }, [pageAndLimit, isDeleteOrStart]);

  useEffect(() => {
    console.log(apiData)
    console.log(totalPages)
  }, [apiData])


  const row = apiData.map((eachData, index) => {
    return {
      "Title": <Author name={`${eachData["title"]}`} />,
      "Company": <Function job={`${eachData["company"]}`} />,
      "Location": <Function job={`${eachData["location"]}`} />,
      "Via": <SoftTypography variant="caption" color="secondary" fontWeight="medium">{eachData["via"]}</SoftTypography>,
      "Extensions": <Function job={`${eachData["extensions"]}`} />,
      "Status": <Function job={`${eachData["status"]}`} />,
    }
  })

  const authorsTableData = {
    columns: [
      { name: "Title", align: "left" },
      { name: "Company", align: "left" },
      { name: "Location", align: "center" },
      { name: "Via", align: "center" },
      { name: "Extensions", align: "center" },
      { name: "Status", align: "center" },
    ],

    rows: row,
    paginationData:
    {
      SetPageAndLimit,
      pageAndLimit,
      totalPages
    },
    SetIsDeleteOrStart,
    isDeleteOrStart
  };
  return authorsTableData
}

dataFun.propTypes = {
  paginationData: PropTypes.object.isRequired
};

export default dataFun;


