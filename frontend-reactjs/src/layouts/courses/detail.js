import { useState, useEffect } from "react";
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
import CourseService from "service/courseService";
import CategoryService from "service/categoryService";

function ViewDetail() {
  const [datas, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [chapter, setChapter] = useState("");
  const [fileDocument, setFileDocument] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [contant, setContant] = useState("");
  const params = useParams();

  useEffect(() => {
    loadCategory();
    loadCourse();
  }, []);

  const loadCategory = async () => {
    const response = await CategoryService.getAll();
    const item = response.data.data;
    setData([...datas, item]);
  };

  const loadCourse = async () => {
    const response = await CourseService.getById(params._id);
    const item = response.data.data;
    setTitle(item.title);
    // setCategory(item.title);
    setIcon(item.pictureUrls);
    setChapter(item.chapers);
    setFileDocument(item.files);
    setAuthor(item.author);
    setPrice(item.price);
    setRate(item.rate);
    setDateTime(item.dateTime);
    setContant(item.contants);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={10}>
            <Card>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Title:{" "}
                      <span style={{ fontWeight: 400 }}> {title ? title : "None title"} </span>
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Logo:{" "}
                      <span style={{ fontWeight: 400, color: "orange" }}> {"None logo"} </span>
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Chapters:{" "}
                      <span style={{ fontWeight: 400, color: "orange" }}>
                        {"It has no Chapter yet!"}{" "}
                      </span>
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      File Document:{" "}
                      <span style={{ fontWeight: 400, color: "orange" }}>
                        {"None File Documents"}{" "}
                      </span>
                    </MDTypography>
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Author:{" "}
                      <span style={{ fontWeight: 400 }}> {author ? author : "None Author"} </span>
                    </MDTypography>
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Price:{" "}
                      <span style={{ fontWeight: 400 }}>
                        ${price ? price : "It has no price yet!"}{" "}
                      </span>
                    </MDTypography>
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Rate: <span style={{ fontWeight: 400 }}> {rate ? rate : "None Rate"} </span>
                    </MDTypography>
                  </MDBox>

                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Date and Time:{" "}
                      <span style={{ fontWeight: 400 }}>
                        {dateTime ? dateTime : "None Date Time"}{" "}
                      </span>
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Contants:{" "}
                      <span style={{ fontWeight: 400 }}>
                        {contant ? contant : "It has no Contants yet!"}{" "}
                      </span>
                    </MDTypography>
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

export default ViewDetail;
