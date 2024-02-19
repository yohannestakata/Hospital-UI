import { useMutation } from "react-query";
import { rejectOrder } from "../../services/ordersApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useRejectOrder() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: rejectOrder,
    onSuccess: () => {
      toast.success("Order rejected");
      navigate("/reception/waitlist");
    },
  });

  return { rejectOrder: mutate };
}

export default useRejectOrder;
