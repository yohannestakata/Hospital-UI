import { useMutation } from "react-query";
import { approveOrder } from "../../services/ordersApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useApproveOrder() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: approveOrder,
    onSuccess: () => {
      toast.success("Orders approved");
      navigate("/reception/waitlist");
    },
  });
  return { approveOrder: mutate };
}

export default useApproveOrder;
