import { useQuery } from "react-query";
import { getPatientByCard } from "../services/patientsApi";

function useGetPatientByCardNum(cardNum) {
  const { isLoading, data } = useQuery({
    queryFn: () => getPatientByCard(cardNum),
    queryKey: ["patient", `${cardNum}`],
  });

  return { isLoading, data };
}

export default useGetPatientByCardNum;
