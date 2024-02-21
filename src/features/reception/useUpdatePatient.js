import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { updatePatient } from "../../services/patientsApi";
import { usePatient } from "../../context/PatientContext";

function useUpdatePatient() {
  const navigate = useNavigate();
  const { setPatient } = usePatient();

  const { mutate, isLoading } = useMutation({
    mutationFn: updatePatient,
    onSuccess: (result) => {
      toast.success("Patient edited successfully");
      navigate(-1);
      setPatient(result.data.data);
      console.log(result.data.data);
    },
    onError: () => {
      toast.error("Error updating patient");
    },
  });

  return { updatePatient: mutate, isLoading };
}

export default useUpdatePatient;
