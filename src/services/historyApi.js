import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function getPatientHistory(id) {
  return axios({
    url: `${API_BASE_URL}/api/v1/patient-history/${id}`,
    method: "get",
  });
}
