import { header } from "./header";
import http from "./http";

export default function apiService(endpoint) {
  this.getAll = () => {
    return http.get(endpoint, { headers: header() });
  };

  this.getById = (id) => {
    return http.get(`${endpoint}/${id}`, { headers: header() });
  };

  this.add = (data) => {
    return http.post(endpoint, data, { headers: header() });
  };

  this.update = (id, data) => {
    return http.put(`${endpoint}/${id}`, data, { headers: header() });
  };

  this.remove = (id) => {
    return http.delete(`${endpoint}/${id}`, { headers: header() });
  };
}
