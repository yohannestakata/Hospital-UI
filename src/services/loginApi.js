import axios from "axios";
// import Cookies from "js-cookie";
import API_BASE_URL from "./apiConfig";

export function login(fields) {
  return axios({
    method: "post",
    data: fields,
    url: `${API_BASE_URL}/api/v1/login/`,
  });
}

export async function getUserByToken(token) {
  const response = await axios({
    method: "get",
    headers: { authorization: token },
    url: `${API_BASE_URL}/api/v1/login`,
  });
  return response.data;
}
