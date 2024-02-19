import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function addAppointment(fields) {
  return axios({
    url: `${API_BASE_URL}/api/v1/appointments`,
    method: "post",
    data: fields,
  });
}

export function getAppointments() {
  return axios({
    url: `${API_BASE_URL}/api/v1/appointments`,
    method: "get",
  });
}

export function deleteAppointment(id) {
  return axios({
    url: `${API_BASE_URL}/api/v1/appointments`,
    method: "delete",
    data: { id },
  });
}
