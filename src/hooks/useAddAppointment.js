import { useMutation } from "react-query";
import { addAppointment } from "../services/appointmentsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useAddAppointment() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (fields) => addAppointment(fields),
    onSuccess: () => {
      toast.success("Appointment added");
      navigate("/doctor/:patientId");
    },
  });

  return { mutate };
}

export default useAddAppointment;
