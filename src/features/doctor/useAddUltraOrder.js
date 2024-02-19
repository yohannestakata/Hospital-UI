import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { orderUltraTest } from "../../services/ordersApi";

function useAddUltraOrder() {
  const { isLoading, mutate } = useMutation({
    mutationFn: (fields) => orderUltraTest(fields),
    onSuccess: () => {
      toast.success("Ultrasound order added");
    },
  });

  return { isLoading, mutate };
}

export default useAddUltraOrder;
