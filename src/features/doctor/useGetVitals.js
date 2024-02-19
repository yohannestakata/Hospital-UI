import { useQuery } from "react-query";
import { getVitals } from "../../services/patientVitals";

function useGetVitals(vitalsId) {
  const { data, isLoading } = useQuery({
    queryFn: () => {
      return getVitals(vitalsId);
    },
    queryKey: ["vitals", vitalsId],
  });

  return { patientVitals: data?.data, vitalsLoading: isLoading };
}

export default useGetVitals;
