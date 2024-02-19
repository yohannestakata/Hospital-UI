import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function uploadUltraResults(fields) {
  return axios({
    url: `${API_BASE_URL}/api/v1/results/ultrasound`,
    method: "post",
    data: fields,
  });
}

export function uploadXrayResults(fields) {
  return axios({
    url: `${API_BASE_URL}/api/v1/results/xray`,
    data: fields,
    method: "post",
  });
}

export function uploadXUltraResults(fields) {
  return axios({
    url: `${API_BASE_URL}/api/v1/results/xultra`,
    data: fields,
    method: "post",
  });
}

export function uploadLabResults(fields) {
  return axios({
    url: `${API_BASE_URL}/api/v1/results/lab`,
    method: "post",
    data: fields,
  });
}

export async function getUltraResults(id) {
  const result = await axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/results/ultrasound/${id}`,
  });
  return result;
}

export function getXrayResults(id) {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/results/xray/${id}`,
  });
}

export function getLabResults(id) {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/results/lab/${id}`,
  });
}

export function getAllResults(date, patientId) {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/results/all?date=${date}&patientId=${patientId}`,
  });
}
