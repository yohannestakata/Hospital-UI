import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function orderLabTest(fields) {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/v1/orders/labratory`,
    data: fields,
  });
}

export function orderUltraTest(fields) {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/v1/orders/ultrasound`,
    data: fields,
  });
}

export function addOrders(fields) {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/v1/orders`,
    data: fields,
  });
}

export function getOrderedLabTests(id) {
  return axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/orders/labratory/${id}`,
  });
}

export function getOrderedUltraTests(id) {
  const result = axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/orders/ultrasound/${id}`,
  });
  return result;
}

export function getOrderedXrayTests(id) {
  const result = axios({
    method: "get",
    url: `${API_BASE_URL}/api/v1/orders/xray/${id}`,
  });
  return result;
}

export function rejectOrder(id) {
  console.log(id);
  return axios({
    method: "delete",
    url: `${API_BASE_URL}/api/v1/orders`,
    data: { id },
  });
}

export function approveOrder(fields) {
  return axios({
    method: "post",
    url: `${API_BASE_URL}/api/v1/orders/approve`,
    data: fields,
  });
}
