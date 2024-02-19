import { useQuery } from "react-query";
import { getLabResults } from "../../services/resultsApi";

function useGetLabResult(id) {
  const { data } = useQuery({
    queryFn: () => getLabResults(id),
    queryKey: ["labresult", id],
  });

  return { labResult: data?.data.data };
}

export default useGetLabResult;
