import { useQuery } from "react-query";
import { getOrderedUltraTests } from "../../services/ordersApi";

function useGetUltraOrder(id) {
  const { data } = useQuery({
    queryFn: () => getOrderedUltraTests(id),
    queryKey: ["ultraorder", id],
  });
  return { order: data?.data.data };
}

export default useGetUltraOrder;
