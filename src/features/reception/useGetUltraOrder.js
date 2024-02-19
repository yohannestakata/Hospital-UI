import { useQuery } from "react-query";
import { getOrderedUltraTests } from "../../services/ordersApi";

function useGetUltraOrder(id) {
  const { data: ultraOrder } = useQuery({
    queryFn: () => getOrderedUltraTests(id),
    queryKey: ["ultraOrder", id],
  });

  return { ultraOrder: ultraOrder?.data.data };
}
export default useGetUltraOrder;
