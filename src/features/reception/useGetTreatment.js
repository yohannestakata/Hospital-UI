import { useQuery } from "react-query";
import { getActualDiagnosis } from "../../services/actualDiagnosisApi";

function useGetTreatment(id) {
  const { data } = useQuery({
    queryFn: () => getActualDiagnosis(id),
    queryKey: ["treatment", id],
  });

  return { treatment: data?.data.data };
}

export default useGetTreatment;
