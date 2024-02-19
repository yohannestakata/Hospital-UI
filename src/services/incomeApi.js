import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function getIncome(data) {
  return axios({
    url: `${API_BASE_URL}/api/v1/income/${data}`,
  });
}
