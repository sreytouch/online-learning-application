// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Category from "layouts/categories";
import CategoryAdd from "layouts/categories/create";
import CategoryEdit from "layouts/categories/update";
import Course from "layouts/courses";
import CourseAdd from "layouts/courses/create";
import CourseEdit from "layouts/courses/update";
import CourseViewDetail from "layouts/courses/detail";
// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    // type: "collapse",
    // name: "Tables",
    key: "tables",
    // icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    // type: "collapse",
    // name: "Billing",
    key: "billing",
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    // type: "collapse",
    // name: "Notifications",
    key: "notifications",
    // icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    // type: "collapse",
    // name: "Profile",
    key: "profile",
    // icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    // type: "collapse",
    // name: "Sign In",
    key: "sign-in",
    // icon: <Icon fontSize="small">login</Icon>,
    route: "/",
    component: <SignIn />,
  },
  {
    // type: "collapse",
    // name: "Sign Up",
    key: "sign-up",
    // icon: <Icon fontSize="small">assignment</Icon>,
    route: "/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Category",
    key: "category",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/category",
    component: <Category />,
  },
  {
    // type: "collapse",
    // name: "Category",
    key: "category",
    // icon: <Icon fontSize="small">category</Icon>,
    route: "/category/add",
    component: <CategoryAdd />,
  },
  {
    // type: "collapse",
    // name: "Category",
    key: "category",
    // icon: <Icon fontSize="small">category</Icon>,
    route: "/category/edit/:_id",
    component: <CategoryEdit />,
  },
  {
    type: "collapse",
    name: "Course",
    key: "course",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/course",
    component: <Course />,
  },
  {
    // type: "collapse",
    // name: "Category",
    key: "course",
    // icon: <Icon fontSize="small">course</Icon>,
    route: "/course/add",
    component: <CourseAdd />,
  },
  {
    // type: "collapse",
    // name: "course",
    key: "course",
    // icon: <Icon fontSize="small">course</Icon>,
    route: "/course/edit/:_id",
    component: <CourseEdit />,
  },
  {
    // type: "collapse",
    // name: "course",
    key: "course",
    // icon: <Icon fontSize="small">course</Icon>,
    route: "/course/detail/:_id",
    component: <CourseViewDetail />,
  },
];

export default routes;
