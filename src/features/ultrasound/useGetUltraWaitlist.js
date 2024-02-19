import { useQuery } from "react-query";
import { getUltraWaitlist } from "../../services/waitinglistApi";

function useGetUltraWaitlist() {
  const { data, isLoading } = useQuery({
    queryFn: getUltraWaitlist,
    queryKey: ["ultra-waitlist"],
  });

  return { waitlist: data?.data.data, isLoading };
}

export default useGetUltraWaitlist;
