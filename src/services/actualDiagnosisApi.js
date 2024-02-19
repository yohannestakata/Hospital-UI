import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function addActualDiagnosis(fields) {
  return axios({
    data: fields,
    method: "post",
    url: `${API_BASE_URL}/api/v1/actualDiagnosis`,
  });
}

export function getActualDiagnosis(id) {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/actualDiagnosis/${id}`,
  });
}
