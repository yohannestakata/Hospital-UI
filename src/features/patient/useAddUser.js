import { useMutation } from "react-query";
import { addPatients } from "../../services/patientsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useAddUser(goBack = true) {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (fields) => addPatients(fields),
    onSuccess: () => {
      toast.success("ታካሚ ተመዝግቧል።");
      if (goBack) navigate("/reception");
    },
    onError: () => {
      toast.error("ታካሚ አልተመዘገበም!");
    },
  });
  return { mutate, isLoading };
}
