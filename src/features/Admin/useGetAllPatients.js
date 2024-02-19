import { useQuery } from "react-query";
import { getAllPatients } from "../../services/patientsApi";

function useGetAllPatients() {
  const { data } = useQuery({
    queryFn: getAllPatients,
    queryKey: ["all-patients"],
  });
  return { patients: data?.data.patients };
}

export default useGetAllPatients;
