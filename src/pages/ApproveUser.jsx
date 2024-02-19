import { useLocation } from "react-router-dom";
import ApprovePatientDetails from "../features/reception/ApprovePatientDetails";

function ApproveUser() {
  const location = useLocation();
  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const patientId = params.get("patientid");
  const doctorId = params.get("doctorid");
  const labOrderId = params.get("labid");
  const ultrasoundId = params.get("ultrasoundid");
  const vitalsId = params.get("vitalsid");
  const xrayId = params.get("xrayid");
  const waitingId = params.get("waitingid");
  const medicineId = params.get("medicineId");
  const ecg = params.get("ecg");
  const earIrrigation = params.get("earIrrigation");

  return (
    <ApprovePatientDetails
      doctorId={doctorId}
      patientId={patientId}
      labOrderId={labOrderId}
      ultrasoundOrderId={ultrasoundId}
      xrayOrderId={xrayId}
      vitalsId={vitalsId}
      waitingId={waitingId}
      medicineId={medicineId}
      ecg={ecg}
      earIrrigation={earIrrigation}
    />
  );
}

export default ApproveUser;
