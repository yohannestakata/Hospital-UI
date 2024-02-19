import { useQuery } from "react-query";
import { getDoctorWaitingList } from "../../services/waitinglistApi";

function useGetDoctorWaitingList() {
  const { isLoading, data } = useQuery({
    queryFn: getDoctorWaitingList,
    queryKey: ["doctor-waiting-list"],
  });

  return { isLoading, data };
}

export default useGetDoctorWaitingList;
