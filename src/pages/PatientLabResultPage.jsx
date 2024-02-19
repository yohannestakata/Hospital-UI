import { useSearchParams } from "react-router-dom";
import ShowLabResults from "../features/doctor/ShowLabResults";

function PatientLabResultPage() {
  const [searchParams] = useSearchParams();
  const labResultId = searchParams.get("labId");
  return (
    <div className="">
      <ShowLabResults labId={labResultId} />
    </div>
  );
}

export default PatientLabResultPage;
