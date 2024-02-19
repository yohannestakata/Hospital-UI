import { useMutation } from "react-query";
import { addAppointment } from "../services/appointmentsApi";
import toast from "react-hot-toast";

function useAddAppointment() {
  const { mutate } = useMutation({
    mutationFn: (fields) => addAppointment(fields),
    onSuccess: () => {
      toast.success("Appointment added");
    },
  });

  return { mutate };
}

export default useAddAppointment;
