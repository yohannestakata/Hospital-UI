import axios from "axios";
import API_BASE_URL from "./apiConfig";

export function uploadVitals(
  vitalsData,
  patientId,
  userId,
  waitingId,
  doctorId
) {
  const formData = new FormData();
  formData.append("file", vitalsData, "uploadedFile.txt");
  formData.append("patientId", patientId);
  formData.append("nurseId", userId);
  formData.append("waitingId", waitingId);
  formData.append("doctorId", doctorId);

  return axios.post(`${API_BASE_URL}/api/v1/vitals`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getVitals(id) {
  const result = await axios({
    url: `${API_BASE_URL}/api/v1/vitals/${id}`,
    method: "get",
  });
  return result;
}
