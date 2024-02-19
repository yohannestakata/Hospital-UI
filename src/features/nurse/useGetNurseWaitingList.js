import { useQuery } from "react-query";
import { getNurseWaitingList } from "../../services/waitinglistApi";

function useGetNurseWaitingList() {
  const { isLoading, data } = useQuery({
    queryFn: getNurseWaitingList,
    queryKey: ["nurse-waiting-list"],
  });

  return { isLoading, data };
}

export default useGetNurseWaitingList;
