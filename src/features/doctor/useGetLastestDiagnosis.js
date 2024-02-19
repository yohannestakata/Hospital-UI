import { useQuery } from "react-query";
import { getLastestDiagnosis } from "../../services/diagnosisApi";

function useGetLatestDiagnosis(id) {
  const { data } = useQuery({
    queryFn: () => getLastestDiagnosis(id),
    queryKey: ["latestDiagnosis", id],
  });
  return { latestDiagnosis: data?.data.data };
}

export default useGetLatestDiagnosis;
