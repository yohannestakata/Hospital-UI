import { useQuery } from "react-query";
import { getIncome } from "../services/incomeApi";

function useGetIncome(date) {
  const { data } = useQuery({
    queryFn: () => getIncome(date),
    queryKey: ["income", date],
  });

  return { data: data?.data.data };
}

export default useGetIncome;
