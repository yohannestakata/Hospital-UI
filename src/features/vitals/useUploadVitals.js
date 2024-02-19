import { useMutation } from "react-query";
import { uploadVitals } from "../../services/patientVitals";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useUploadVitals() {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ blob, patientId, userId, waitingId, doctorId }) =>
      uploadVitals(blob, patientId, userId, waitingId, doctorId),
    onSuccess: () => {
      toast.success("Patient vitals added");
      navigate("/nurse");
    },
  });

  return { isLoading, mutate };
}

export default useUploadVitals;
