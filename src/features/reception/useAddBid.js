import { useMutation } from "react-query";
import { addBid } from "../../services/bidApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useAddBid() {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: addBid,
    onSuccess: () => {
      toast.success("Payment success");
      navigate("/reception");
    },
  });

  return { mutate, isLoading };
}

export default useAddBid;
