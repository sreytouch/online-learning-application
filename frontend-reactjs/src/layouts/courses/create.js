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
import CourseService from "service/courseService";

function Create() {
  const [datas, setDatas] = useState([]);

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
    // console.log("==body==", body);
    await CourseService.add(body)
      .then((res) => {
        console.log("===res.data=", res);
        if (res.status === 200 || res.status === 201) {
          // console.log("===res.data=", res.data.data);
          setDatas(res.data.data);
          navigate("/course");
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
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Type Category:
                    </MDTypography>
                    <select
                      name="typeCategory"
                      id="typeCategory"
                      style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "transparent",
                        fontSize: "0.875rem",
                        borderRadius: "0.375rem",
                        borderColor: "#ccc",
                      }}
                    >
                      <option value="category1">category 1</option>
                      <option value="category2">category 2</option>
                      <option value="category3">category 3</option>
                      <option value="category4">category 4</option>
                    </select>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      image:
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
                      Author:
                    </MDTypography>
                    <MDInput
                      variant="outlined"
                      color="secondary"
                      type="text"
                      fullWidth
                      name="author"
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Price:
                    </MDTypography>
                    <MDInput
                      variant="outlined"
                      color="secondary"
                      type="number"
                      fullWidth
                      name="price"
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Rate:
                    </MDTypography>
                    <MDInput
                      variant="outlined"
                      color="secondary"
                      type="text"
                      fullWidth
                      name="rate"
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Date and Time:
                    </MDTypography>
                    <MDInput
                      variant="outlined"
                      color="secondary"
                      type="text"
                      fullWidth
                      name="dateTime"
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Contants:
                    </MDTypography>
                    <textarea
                      color="secondary"
                      name="contants"
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
