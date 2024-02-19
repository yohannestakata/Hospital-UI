import { useQuery } from "react-query";
import { getOrderedXrayTests } from "../../services/ordersApi";

function useGetXrayOrder(id) {
  const { data: xrayOrder } = useQuery({
    queryFn: () => getOrderedXrayTests(id),
    queryKey: ["xrayOrder", id],
  });

  return { xrayOrder: xrayOrder?.data.data };
}
export default useGetXrayOrder;
