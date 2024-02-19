import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function addPatients(fields) {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/v1/patients/`,
    data: fields,
  });
}

export async function getPatient(id) {
  const patient = await axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/patients/${id}`,
  });
  return patient;
}

export function getPatientByCard(cardNum) {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/patients/get/${cardNum}`,
  });
}

export function getAllPatients() {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/patients`,
  });
}

export function updatePatient(fields) {
  console.log(fields);
  return axios({
    method: "patch",
    url: `${API_BASE_URL}/api/v1/patients/${fields._id}`,
    data: fields,
  });
}
