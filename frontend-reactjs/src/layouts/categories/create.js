import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

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

// call service
import CategoryService from "service/categoryService";

function Create() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = {};
    for (const [key, value] of form.entries()) {
      if (value.name != undefined) {
        body[key] = value.name;
      } else {
        body[key] = value;
      }
    }
    await CategoryService.add(body)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          navigate("/category");
        }
      })
      .catch((e) => {
        alert(e.message);
      });
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
                      required
                      variant="outlined"
                      color="secondary"
                      type="text"
                      fullWidth
                      name="title"
                    />
                  </MDBox>
                  {/* <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" /> */}
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Logo:
                    </MDTypography>
                    <MDInput
                      variant="outlined"
                      color="secondary"
                      type="file"
                      accept="image/png, image/jpeg"
                      name="pictureUrls"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Decription:
                    </MDTypography>
                    <textarea
                      color="secondary"
                      name="decription"
                      rows="5"
                      cols="33"
                      style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "transparent",
                        fontSize: "0.875rem",
                        borderRadius: "0.375rem",
                        borderColor: "#ccc",
                      }}
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
