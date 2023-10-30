import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Create() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [decription, setDecription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={10}>
            <Card>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form" onSubmit={handleSubmit}>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Title:
                    </MDTypography>
                    <MDInput
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      variant="outlined"
                      color="secondary"
                      type="text"
                      fullWidth
                      value={title}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      image:
                    </MDTypography>
                    <MDInput
                      onChange={(e) => setImage(e.target.value)}
                      required
                      variant="outlined"
                      color="secondary"
                      type="file"
                      value={image}
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Author:
                    </MDTypography>
                    <MDInput
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      variant="outlined"
                      color="secondary"
                      type="text"
                      fullWidth
                      value={title}
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Price:
                    </MDTypography>
                    <MDInput
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      variant="outlined"
                      color="secondary"
                      type="text"
                      fullWidth
                      value={title}
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Rate:
                    </MDTypography>
                    <MDInput
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      variant="outlined"
                      color="secondary"
                      type="text"
                      fullWidth
                      value={title}
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Date and Time:
                    </MDTypography>
                    <MDInput
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      variant="outlined"
                      color="secondary"
                      type="text"
                      fullWidth
                      value={title}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Decription:
                    </MDTypography>
                    <MDInput
                      onChange={(e) => setDecription(e.target.value)}
                      required
                      variant="outlined"
                      color="secondary"
                      type="text"
                      value={decription}
                      fullWidth
                      hidden
                    />
                  </MDBox>
                  <MDBox mt={4} mb={1} xs={3}>
                    <MDButton variant="gradient" color="info" fullWidth type="submit">
                      Create
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Create;
