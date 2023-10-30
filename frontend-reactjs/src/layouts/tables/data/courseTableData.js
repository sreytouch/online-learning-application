/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { Link, Navigate } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// call service
import CourseService from "service/courseService";

// Images
import team2 from "assets/images/team-2.jpg";

export default function CourseTableData() {
  const [datas, setData] = useState([]);
  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const response = await CourseService.getAll();
    const item = response.data.data;
    setData([...datas, item]);
  };

  const Title = () =>
    datas[0] &&
    datas[0].map((datas) => (
      <MDBox display="flex" alignItems="center" key={datas._id} style={{ verticalAlign: "top" }}>
        <MDBox>
          <MDTypography
            display="block"
            variant="button"
            fontWeight="medium"
            style={{ padding: "10px 0 20px 0", border: "1px #ccc" }}
          >
            {datas.title}
          </MDTypography>
        </MDBox>
      </MDBox>
    ));

  const Icon = ({ image, name }) =>
    datas[0] &&
    datas[0].map((datas) => (
      <MDBox display="flex" alignItems="center" key={datas._id} style={{ verticalAlign: "top" }}>
        <MDBox>
          <MDTypography
            display="block"
            variant="button"
            fontWeight="medium"
            style={{ padding: "5px 0 8px 0", border: "1px #ccc" }}
          >
            <MDAvatar src={image} name={name} size="sm" />
          </MDTypography>
        </MDBox>
      </MDBox>
    ));

  const Author = () => {
    datas[0] &&
      datas[0].map((datas) => (
        <MDBox display="flex" alignItems="center" key={datas._id} style={{ verticalAlign: "top" }}>
          <MDBox>
            <MDTypography
              display="block"
              variant="button"
              fontWeight="medium"
              style={{ padding: "10px 0 20px 0", border: "1px #ccc" }}
            >
              {datas.author}
            </MDTypography>
          </MDBox>
        </MDBox>
      ));
  };

  const Action = ({ edited, deleted }) =>
    datas[0] &&
    datas[0].map((datas) => (
      <MDBox display="flex" alignItems="center" key={datas._id} style={{ verticalAlign: "top" }}>
        <MDBox>
          <MDTypography
            display="block"
            variant="button"
            fontWeight="medium"
            style={{ padding: "10px 0 20px 0", border: "1px #ccc" }}
          >
            <MDBadge
              component={Link}
              to="/category/detail"
              badgeContent="view detail"
              color="warning"
              variant="gradient"
              size="sm"
            />
            <MDBadge
              component={Link}
              to="/category/edit"
              badgeContent={edited}
              color="success"
              variant="gradient"
              size="sm"
            />
            <MDBadge
              component={Link}
              to="/category/delete"
              badgeContent={deleted}
              color="error"
              variant="gradient"
              size="sm"
            />
          </MDTypography>
        </MDBox>
      </MDBox>
    ));

  const dataRows = [
    {
      title: <Title />,
      icon: <Icon image={team2} name={team2} />,
      author: <Author />,
      action: <Action edited="Edit" deleted="Delete" />,
    },
  ];

  return {
    columns: [
      { Header: "title", accessor: "title", width: "20%", align: "left" },
      { Header: "icon", accessor: "icon", width: "10%", align: "left" },
      { Header: "author", accessor: "author", width: "40%", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: dataRows,
  };
}
