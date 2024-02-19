import { useQuery } from "react-query";
import { getDoctors as getDoctorsApi } from "../services/doctorsApi";

function useGetDoctors() {
  const { isLoading, data } = useQuery({
    queryFn: getDoctorsApi,
    queryKey: ["doctors"],
  });

  return { isLoading, doctors: data?.data.data };
}

export { useGetDoctors };
