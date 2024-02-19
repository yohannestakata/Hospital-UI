import { useQuery } from "react-query";
import { getOrderedLabTests } from "../../services/ordersApi";

function useGetLabOrders(id) {
  const { isLoading, data: labOrders } = useQuery({
    queryFn: () => getOrderedLabTests(id),
    queryKey: ["labOrder", id],
  });

  return { isLoading, labOrders };
}

export default useGetLabOrders;
