import { useQuery } from "react-query";
import { getOrderedXrayTests } from "../../services/ordersApi";

function useGetXrayOrder(id) {
  const { data } = useQuery({
    queryFn: () => {
      return getOrderedXrayTests(id);
    },
    queryKey: ["xrayorder", id],
  });
  return { order: data?.data.data };
}

export default useGetXrayOrder;
