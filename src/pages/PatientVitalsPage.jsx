import { useSearchParams } from "react-router-dom";
import ShowVitals from "../features/doctor/ShowVitals";

function PatientVitalsPage() {
  const [params] = useSearchParams();
  const vitalsId = params.get("vitals");
  return <ShowVitals vitalsId={vitalsId} />;
}

export default PatientVitalsPage;
