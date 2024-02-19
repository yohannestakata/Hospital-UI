import { useMutation } from "react-query";
import { addOrders } from "../../services/ordersApi";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePatient } from "../../context/PatientContext";

function useAddOrder() {
  const { patient } = usePatient();
  const [searchParams] = useSearchParams();
  const vitalsId = searchParams.get("vitals");
  const ultrasoundResultId = searchParams.get("ultrasound");
  const xrayResultId = searchParams.get("xray");
  const labResultId = searchParams.get("labId");
  const waitingId = searchParams.get("waitingId");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: addOrders,
    onSuccess: () => {
      toast.success("Ordered successfully");
      navigate(
        `/doctor/:patientId?labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}&waitingId=${waitingId}&patientId=${patient._id}`,
      );
    },
  });
  return { mutate };
}

export default useAddOrder;
