import { useQuery } from "react-query";
import { getAllResults } from "../../services/resultsApi";

function useGetAllResults({ date, patientId }) {
  const { data } = useQuery({
    queryFn: () => getAllResults(date, patientId),
    queryKey: ["all-results", date, patientId],
  });
  return { data: data?.data.data };
}

export default useGetAllResults;
