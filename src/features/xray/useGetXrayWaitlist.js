import { useQuery } from "react-query";
import { getXrayWaitlist } from "../../services/waitinglistApi";

function useGetXrayWaitlist() {
  const { data, isLoading } = useQuery({
    queryFn: getXrayWaitlist,
    queryKey: ["xray-waitlist"],
  });
  return { waitlist: data?.data.data, isLoading };
}

export default useGetXrayWaitlist;
