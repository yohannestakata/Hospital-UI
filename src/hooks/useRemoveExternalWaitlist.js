import { useMutation } from "react-query";
import { removeExternalWaitlist } from "../services/waitinglistApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useRemoveExternalWaitlist({ orderId, orderList, goto }) {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => removeExternalWaitlist({ id: orderId, list: orderList }),
    onSuccess: () => {
      toast.success("Finished");
      navigate(goto);
    },
  });

  return { deleteWaitlist: mutate };
}

export default useRemoveExternalWaitlist;
