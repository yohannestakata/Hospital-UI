import { useQuery } from "react-query";
import { getAppointments } from "../../services/appointmentsApi";

function useGetAppointments() {
  const { data } = useQuery({
    queryFn: getAppointments,
    queryKey: ["appointments"],
  });
  return { appointments: data?.data.data };
}

export default useGetAppointments;
