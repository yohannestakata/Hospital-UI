import { useMutation } from "react-query";
import { addToWaitinglist } from "../../services/waitinglistApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useAddToWaitingList() {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: addToWaitinglist,
    onSuccess: () => {
      toast.success("Patient added to waiting list");
      navigate("/reception");
    },
  });

  return { isLoading, mutate };
}

export default useAddToWaitingList;
