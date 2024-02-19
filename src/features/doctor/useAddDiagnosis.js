import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { uploadDiagnosis } from "../../services/diagnosisApi";
import { useNavigate, useSearchParams } from "react-router-dom";

function useAddDiagnosis() {
  const [searchParams] = useSearchParams();
  const vitalsId = searchParams.get("vitals");
  const ultrasoundResultId = searchParams.get("ultrasound");
  const xrayResultId = searchParams.get("xray");
  const labResultId = searchParams.get("labId");
  const waitingId = searchParams.get("waitingId");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (fields) => {
      uploadDiagnosis(fields);
    },
    onSuccess: () => {
      toast.success("Patient examination registered");
      navigate(
        `/doctor/:patientId/?labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}&waitingId=${waitingId}`,
      );
    },
  });

  return { addDiagnosis: mutate };
}

export default useAddDiagnosis;
