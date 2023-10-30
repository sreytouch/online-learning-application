import http from "./config/http";
import { LOGIN_ENDPOINT, USER_ENDPOINT } from "./config/endpoint";

export const loginService = (data) => {
  return http.post(LOGIN_ENDPOINT, data);
};

export const registerService = (data) => {
  return http.post(USER_ENDPOINT, data);
};
