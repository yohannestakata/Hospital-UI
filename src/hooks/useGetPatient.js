import { useQuery } from "react-query";
import { getPatient } from "../services/patientsApi";

function useGetPatient(id) {
  const { isLoading, data } = useQuery({
    queryFn: () => getPatient(id),
    queryKey: ["patient", `${id}`],
  });

  return { isLoading, patient: data?.data.data };
}

export default useGetPatient;
