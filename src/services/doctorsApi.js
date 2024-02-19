import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function getDoctors() {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/staff/doctors/`,
  });
}
