/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

//dialog-delete
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//end dialog-delete

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

  // dialog-delete
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async (id) => {
    console.log("==id==", id);
    // await CourseService.remove(id)
    //   .then((res) => {
    //     if (res.status === 200 || res.status === 201) {
    //       navigate("/course");
    //     }
    //   })
    //   .catch((e) => {
    //     alert(e.message);
    //   });
  };
  const DialogDelete = ({ deletedID }) => {
    return (
      <>
        <Button
          onClick={handleClickOpen}
          color="error"
          variant="gradient"
          size="sm"
          style={{
            padding: "4px 0",
            fontSize: "8px",
            textAlign: "center",
            borderRadius: "0.375rem",
            background: "linear-gradient(195deg, #EF5350, #E53935)",
            color: "#ffffff",
            marginLeft: "0.5rem",
          }}
        >
          DELETE
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Do you want to delete this record ?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} style={{ background: "orange", color: "white" }}>
              Cancel
            </Button>
            {/* <Button onClick={handleClose} autoFocus> */}
            <Button
              // onClick={handleDelete(deletedID)}
              style={{ background: "red", color: "white" }}
              onClick={handleClose}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  //end dialog-delete

  const Action = ({ edited }) =>
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
              to={"/course/detail/" + datas._id}
              badgeContent="view detail"
              color="warning"
              variant="gradient"
              size="sm"
            />
            <MDBadge
              component={Link}
              to={"/course/edit/" + datas._id}
              badgeContent={edited}
              color="success"
              variant="gradient"
              size="sm"
            />
            <DialogDelete deletedID={datas._id} />
          </MDTypography>
        </MDBox>
      </MDBox>
    ));

  const dataRows = [
    {
      title: <Title />,
      icon: <Icon image={team2} name={team2} />,
      author: <Author />,
      action: <Action edited="Edit" />,
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
