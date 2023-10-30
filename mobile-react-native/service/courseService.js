import apiService from "./config/apiService";
import { COURSE_ENDPOINT } from "./config/endpoint";

const CourseService = new apiService(COURSE_ENDPOINT);
export default CourseService;
