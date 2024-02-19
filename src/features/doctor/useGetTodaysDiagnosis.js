import { useQuery } from "react-query";
import { getTodaysDiagnosis } from "../../services/diagnosisApi";

function useGetTodaysDiagnosis(id) {
  const { data } = useQuery({
    queryFn: () => getTodaysDiagnosis(id),
    queryKey: ["todaysDiagnosis", id],
  });
  return { todaysDiagnosis: data?.data.data };
}

export default useGetTodaysDiagnosis;
