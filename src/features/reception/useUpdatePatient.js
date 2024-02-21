import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { updatePatient } from "../../services/patientsApi";

function useUpdatePatient() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: updatePatient,
    onSuccess: () => {
      toast.success("Patient edited successfully");
      navigate(-1);
    },
    onError: () => {
      toast.error("Error updating patient");
    },
  });

  return { updatePatient: mutate, isLoading };
}

export default useUpdatePatient;
