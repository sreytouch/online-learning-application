import apiService from "./config/apiService";
import { CATEGORY_ENDPOINT } from "./config/endpoint";

const CategoryService = new apiService(CATEGORY_ENDPOINT);
export default CategoryService;
