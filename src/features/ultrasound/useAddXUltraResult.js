import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { uploadXUltraResults } from "../../services/resultsApi";
import { useNavigate } from "react-router-dom";

function useAddXUltraResult() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (fields) => uploadXUltraResults(fields),
    onSuccess: () => {
      toast.success("X-ray result sent");
      navigate("/ultrasound/waitinglist");
      queryClient.invalidateQueries(["ultra-waitlist"]);
    },
    onSettled: () => queryClient.refetchQueries(["ultra-waitlist"]),
  });
  return { mutate };
}

export default useAddXUltraResult;
