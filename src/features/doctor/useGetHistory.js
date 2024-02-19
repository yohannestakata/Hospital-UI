import { useQuery } from "react-query";
import { getPatientHistory } from "../../services/historyApi";

function useGetHistory(id) {
  const { data } = useQuery({
    queryFn: () => getPatientHistory(id),
    queryKey: ["history", id],
  });

  return { history: data?.data.data };
}

export default useGetHistory;
