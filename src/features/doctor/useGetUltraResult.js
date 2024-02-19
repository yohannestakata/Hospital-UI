import { useQuery } from "react-query";
import { getUltraResults } from "../../services/resultsApi";

function useGetUltraResult(id) {
  const { data } = useQuery({
    queryFn: () => getUltraResults(id),
    queryKey: ["ultra-result", id],
  });

  return { ultraResult: data?.data.data };
}

export default useGetUltraResult;
