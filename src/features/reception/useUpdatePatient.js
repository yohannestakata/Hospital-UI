import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { updatePatient } from "../../services/patientsApi";
import { usePatient } from "../../context/PatientContext";

function useUpdatePatient() {
  const navigate = useNavigate();
  const { setPatient } = usePatient();

  const { mutate, isLoading, data } = useMutation({
    mutationFn: updatePatient,
    onSuccess: () => {
      toast.success("Patient edited successfully");
      navigate(-1);
      // setPatient(data);
      console.log(data);
    },
    onError: () => {
      toast.error("Error updating patient");
    },
  });

  return { updatePatient: mutate, isLoading };
}

export default useUpdatePatient;
