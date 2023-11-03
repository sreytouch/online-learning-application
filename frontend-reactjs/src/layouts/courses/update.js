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
import CourseService from "service/courseService";
import CategoryService from "service/categoryService";

function Update() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");
  const [chapter, setChapter] = useState("");
  const [fileDocument, setFileDocument] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [contant, setContant] = useState("");
  const [datas, setData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

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
    await CourseService.update(params._id, body)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
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
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
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
                      onChange={(e) => setCategory(e.target.value)}
                      // value={category}
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
                      {datas[0] &&
                        datas[0].map((datas) => (
                          <option key={datas._id} value={datas.title}>
                            {datas.title}
                          </option>
                        ))}
                    </select>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="h6" mt={3}>
                      Logo:
                    </MDTypography>
                    <MDInput
                      onChange={(e) => setIcon(e.target.value)}
                      value={icon}
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
                      Chapters:
                    </MDTypography>
                    <MDInput
                      onChange={(e) => setChapter(e.target.value)}
                      value={chapter}
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
                      File Document:
                    </MDTypography>
                    <MDInput
                      onChange={(e) => setFileDocument(e.target.value)}
                      value={fileDocument}
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
                      onChange={(e) => setAuthor(e.target.value)}
                      value={author}
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
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
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
                      onChange={(e) => setRate(e.target.value)}
                      value={rate}
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
                      onChange={(e) => setDateTime(e.target.value)}
                      value={dateTime}
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
                      onChange={(e) => setContant(e.target.value)}
                      value={contant}
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

export default Update;
