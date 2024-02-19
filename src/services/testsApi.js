import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function getTests() {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/tests`,
  });
}

export function getOrderedTests(id) {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/orders/labratory/${id}`,
  });
}
