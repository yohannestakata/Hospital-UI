import { useQuery } from "react-query";
import { getXrayResults } from "../../services/resultsApi";

function useGetXrayResult(id) {
  const { data } = useQuery({
    queryFn: () => getXrayResults(id),
    queryKey: ["xray-result", id],
  });

  return { xrayResult: data?.data.data };
}

export default useGetXrayResult;
