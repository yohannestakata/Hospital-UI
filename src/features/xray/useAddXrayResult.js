import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { uploadXrayResults } from "../../services/resultsApi";
import { useNavigate } from "react-router-dom";

function useAddXrayResult() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (fields) => {
      return uploadXrayResults(fields);
    },
    onSuccess: () => {
      toast.success("Xray result sent");
      navigate("/xray");
    },
    onSettled: () => queryClient.refetchQueries(["xray-waitlist"]),
  });
  return { mutate };
}

export default useAddXrayResult;
