import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function addBid(fields) {
  return axios({
    method: "post",
    data: fields,
    url: `${API_BASE_URL}/api/v1/bid`,
  });
}
