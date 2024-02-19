import { useSearchParams } from "react-router-dom";
import ShowXrayResults from "../features/doctor/ShowXrayResults";

function PatientXrayPage() {
  const [searchParams] = useSearchParams();
  const xrayResultId = searchParams.get("xray");

  return (
    <div className="">
      <ShowXrayResults xrayId={xrayResultId} />
    </div>
  );
}

export default PatientXrayPage;
