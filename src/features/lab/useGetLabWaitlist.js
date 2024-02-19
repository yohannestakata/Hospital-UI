import { useQuery } from "react-query";
import { getLabWaitlist } from "../../services/waitinglistApi";

function useGetLabWaitlist() {
  const { data } = useQuery({
    queryFn: getLabWaitlist,
    queryKey: ["labratory"],
  });

  return { waitlist: data?.data.data };
}

export default useGetLabWaitlist;
