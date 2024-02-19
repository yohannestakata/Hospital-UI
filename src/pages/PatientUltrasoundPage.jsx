import { useSearchParams } from "react-router-dom";
import ShowUltrasoundResults from "../features/doctor/ShowUltrasoundResults";

function PatientUltrasoundPage() {
  const [searchParams] = useSearchParams();
  const ultrasoundResultId = searchParams.get("ultrasound");
  return (
    <div className="">
      <ShowUltrasoundResults ultraId={ultrasoundResultId} />
    </div>
  );
}

export default PatientUltrasoundPage;
