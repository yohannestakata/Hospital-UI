import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { uploadLabResults } from "../../services/resultsApi";
import { useNavigate } from "react-router-dom";

function useAddLabResult() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (fields) => uploadLabResults(fields),
    onSuccess: () => {
      toast.success("Lab result sent");
      navigate("/lab-results");
      queryClient.invalidateQueries(["labratory"]);
    },
    onSettled: () => queryClient.refetchQueries(["labratory"]),
  });
  return { mutate };
}

export default useAddLabResult;
