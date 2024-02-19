import { useQuery } from "react-query";
import { getAllDoctorWaitingList } from "../../services/waitinglistApi";

function useGetAllDoctorWaitingList(id) {
  const { isLoading, data } = useQuery({
    queryFn: getAllDoctorWaitingList,
    queryKey: ["doctor-waiting-list-all", [id]],
  });

  return { isLoading, data };
}

export default useGetAllDoctorWaitingList;
