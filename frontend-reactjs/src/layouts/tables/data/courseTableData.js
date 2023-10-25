/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { Link, Navigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";

export default function CourseTableData() {
  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ image, name }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDAvatar src={image} name={name} size="sm" />
    </MDBox>
  );

  const Action = ({ edited, deleted }) => (
    <MDBox lineHeight={1} textAlign="center">
      <MDBadge
        component={Link}
        to="/course/edit"
        badgeContent={edited}
        color="success"
        variant="gradient"
        size="sm"
      />
      <MDBadge
        component={Link}
        to="/course/delete"
        badgeContent={deleted}
        color="success"
        variant="gradient"
        size="sm"
      />
    </MDBox>
  );

  return {
    columns: [
      { Header: "title", accessor: "title", width: "20%", align: "left" },
      { Header: "icon", accessor: "icon", width: "10%", align: "left" },
      { Header: "decription", accessor: "decription", width: "40%", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        title: <Author name="Hello category" />,
        icon: <Job image={team2} />,
        decription: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: <Action edited="Edit" deleted="Delete" />,
      },
    ],
  };
}
