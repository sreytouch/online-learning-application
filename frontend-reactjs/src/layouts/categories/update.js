import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

function Update() {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [decription, setDecription] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const response = await CategoryService.getById(params._id);
    const item = response.data.data;
    setTitle(item.title);
    setDecription(item.decription);
  };

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
    await CategoryService.update(params._id, body)
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
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      variant="outlined"
                      color="secondary"
                      type="text"
                      fullWidth
                      value={title}
                      name="title"
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Icon:
                    </MDTypography>
                    <MDInput
                      onChange={(e) => setIcon(e.target.value)}
                      variant="outlined"
                      color="secondary"
                      type="file"
                      value={icon}
                      fullWidth
                      name="icon"
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Decription:
                    </MDTypography>
                    <MDInput
                      onChange={(e) => setDecription(e.target.value)}
                      variant="outlined"
                      color="secondary"
                      type="text"
                      value={decription}
                      fullWidth
                      name="decription"
                    />
                  </MDBox>
                  <MDBox mt={4} mb={1} xs={3}>
                    <MDButton variant="gradient" color="info" fullWidth type="submit">
                      Update
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

export default Update;
