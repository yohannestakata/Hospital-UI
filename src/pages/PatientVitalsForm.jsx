import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useGetPatient from "../hooks/useGetPatient";
import RecordVitals from "../features/vitals/RecordVitals";

function PatientVitalsForm() {
  const params = useParams();
  const { data } = useGetPatient(params.patientId);
  const navigate = useNavigate();
  const patient = data?.data.patient;

  const [searchParams] = useSearchParams();

  const waitingId = searchParams.get("waitingId");
  const doctorId = searchParams.get("doctorId");

  return (
    <div className="p-3 m-2 w-1/2 mx-auto bg-white rounded-md">
      <button
        className="rounded-sm bg-gray-100 px-2 hover:bg-gray-200 ring-1 ring-gray-400 hover:ring-offset-2 bg-gradient-to-b from-gray-50 to-gray-200 "
        onClick={() => navigate("/nurse")}>
        Waiting list
      </button>
      <div className="flex justify-between align-center mt-4">
        <h1 className="text-2xl">Patient vitals</h1>
        <h2 className="font-bold mt-1">{patient?.name}</h2>
      </div>
      <RecordVitals waitingId={waitingId} doctorId={doctorId} />
    </div>
  );
}

export default PatientVitalsForm;
