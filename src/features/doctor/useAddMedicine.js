import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { orderMedicine } from "../../services/medicineApi";

function useAddMedicine() {
  const { mutate } = useMutation({
    mutationFn: (fields) => {
      orderMedicine(fields);
    },
    onSuccess: () => {
      toast.success("Treatment order successful");
    },
  });

  return { orderMedicine: mutate };
}

export default useAddMedicine;
