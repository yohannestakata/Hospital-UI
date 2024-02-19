import { useQuery } from "react-query";
import { getOrderedTests } from "../../services/testsApi";

function useGetOrderedLabTests(id) {
  const { data } = useQuery({
    queryFn: () => getOrderedTests(id),
    queryKey: ["lab-tests", id],
  });

  return { orderedTests: data?.data.data };
}

export default useGetOrderedLabTests;
