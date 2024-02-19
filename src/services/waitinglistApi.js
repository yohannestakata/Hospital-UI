import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function getNurseWaitingList() {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/waitinglist/nurse`,
  });
}

export function getDoctorWaitingList() {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/waitinglist/doctor`,
  });
}

export function getAllDoctorWaitingList() {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/waitinglist/reception/doctor`,
  });
}

export function addToWaitinglist(fields) {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/v1/waitinglist/nurse`,
    data: fields,
  });
}

export function getApprovalsList() {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/waitinglist/approval`,
  });
}

export function rejectOrder(id) {
  return axios({
    method: "delete",
    url: `${API_BASE_URL}/api/v1/waitinglist/approval/reject`,
    data: { id },
  });
}

export function rejectUltraOrder(id) {
  return axios({
    method: "delete",
    url: `${API_BASE_URL}/api/v1/waitinglist/approval/reject/ultrasound`,
    data: { id },
  });
}

export function addUltraOrder(fields) {
  console.log(fields);
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/v1/waitinglist/approval/approve/ultrasound`,
    data: fields,
  });
}

export function addLabOrder(fields) {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/v1/waitinglist/lab`,
    data: fields,
  });
}

export function getUltraWaitlist() {
  const list = axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/waitinglist/ultrasound`,
  });

  return list;
}

export function getXrayWaitlist() {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/waitinglist/xray`,
  });
}

export function getLabWaitlist() {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/waitinglist/lab`,
  });
}

export function deleteFromWaitlist(id) {
  return axios({
    method: "delete",
    url: `${API_BASE_URL}/api/v1/waitinglist/doctor/${id}`,
  });
}
