import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function orderMedicine({ medicineBlob, patientId, doctorId }) {
  const formData = new FormData();

  formData.append("file", medicineBlob, "uploadedFile.txt");
  formData.append("patientId", patientId);
  formData.append("doctorId", doctorId);

  return axios.post(`${API_BASE_URL}/api/v1/orders/medicine`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
