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
import CategoryService from "service/categoryService";

// Images
import team2 from "assets/images/team-2.jpg";

export default function CategoryTableData() {
  const [datas, setData] = useState([]);
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const response = await CategoryService.getAll();
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
            style={{ padding: "10px 0 20px 0" }}
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
            style={{ padding: "5px 0 8px 0" }}
          >
            <MDAvatar src={image} name={name} size="sm" />
          </MDTypography>
        </MDBox>
      </MDBox>
    ));

  const Decription = () => {
    datas[0] &&
      datas[0].map((datas) => (
        <MDBox display="flex" alignItems="center" key={datas._id} style={{ verticalAlign: "top" }}>
          <MDBox>
            <MDTypography
              display="block"
              variant="button"
              fontWeight="medium"
              style={{ padding: "10px 0 20px 0" }}
            >
              {datas.decription}
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
            style={{ padding: "10px 0 20px 0" }}
          >
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
      decription: <Decription />,
      action: <Action edited="Edit" deleted="Delete" />,
    },
  ];

  return {
    columns: [
      { Header: "title", accessor: "title", width: "20%", align: "left" },
      { Header: "icon", accessor: "icon", width: "10%", align: "left" },
      { Header: "decription", accessor: "decription", width: "40%", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: dataRows,
  };
}
