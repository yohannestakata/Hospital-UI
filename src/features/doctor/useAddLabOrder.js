import { useMutation } from "react-query";
import { orderLabTest } from "../../services/ordersApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useAddLabOrder() {
  const navigate = useNavigate();
  const { data, mutate, isLoading } = useMutation({
    mutationFn: (fields) => {
      orderLabTest(fields);
    },
    onSuccess: () => {
      toast.success("Ordered successfully");
      navigate("/doctor");
    },
  });

  return { data, mutate, isLoading };
}

export default useAddLabOrder;
