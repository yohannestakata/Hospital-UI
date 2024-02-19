import { useMutation } from "react-query";
import { addActualDiagnosis } from "../../services/actualDiagnosisApi";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

function useAddActualDiagnosis() {
  const [searchParams] = useSearchParams();
  const vitalsId = searchParams.get("vitals");
  const ultrasoundResultId = searchParams.get("ultrasound");
  const xrayResultId = searchParams.get("xray");
  const labResultId = searchParams.get("labId");
  const waitingId = searchParams.get("waitingId");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: addActualDiagnosis,
    onSuccess: () => {
      toast.success("Diagnosis Added");
      navigate(
        `/doctor/:patientId/?labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}&waitingId=${waitingId}`,
      );
    },
  });

  return { mutate };
}

export default useAddActualDiagnosis;
