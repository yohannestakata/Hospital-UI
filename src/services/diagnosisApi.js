import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function uploadDiagnosis(fields) {
  console.log(fields);
  return axios({
    method: "post",
    data: fields,
    url: `${API_BASE_URL}/api/v1/diagnosis`,
  });
}

export function getLastestDiagnosis(id) {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/diagnosis/${id}/latest`,
  });
}

export function getTodaysDiagnosis(id) {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/diagnosis/${id}/today`,
  });
}
