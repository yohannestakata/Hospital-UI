import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { uploadUltraResults } from "../../services/resultsApi";
import { useNavigate } from "react-router-dom";

function useAddUltraResult() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (fields) => uploadUltraResults(fields),
    onSuccess: () => {
      toast.success("Ultrasound result sent");
      navigate("/ultrasound/waitinglist");
      queryClient.invalidateQueries(["ultra-waitlist"]);
    },
    onSettled: () => queryClient.refetchQueries(["ultra-waitlist"]),
  });
  return { mutate };
}

export default useAddUltraResult;
