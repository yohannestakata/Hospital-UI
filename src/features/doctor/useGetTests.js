import { useQuery } from "react-query";
import { getTests } from "../../services/testsApi";

function useGetTests() {
  const { isLoading, data } = useQuery({
    queryFn: getTests,
    queryKey: ["tests"],
  });
  return { isLoading, data };
}

export default useGetTests;
