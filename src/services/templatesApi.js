import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function getTemplates() {
  return axios({
    url: `${API_BASE_URL}/api/v1/templates`,
    method: "get",
  });
}

export function addTemplates(fields) {
  return axios({
    url: `${API_BASE_URL}/api/v1/templates`,
    method: "post",
    data: fields,
  });
}
