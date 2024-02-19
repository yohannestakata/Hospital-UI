import { useNavigate, useSearchParams } from "react-router-dom";
import { usePatient } from "../../context/PatientContext";
import useGetHistory from "./useGetHistory";
import useGetLatestDiagnosis from "./useGetLastestDiagnosis";

function convertDateTime(dateString) {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

function DoctorViewPatientHistory() {
  const { patient } = usePatient();
  const patientId = patient._id;
  const [searchParams] = useSearchParams();
  const vitalsId = searchParams.get("vitals");
  const ultrasoundResultId = searchParams.get("ultrasound");
  const xrayResultId = searchParams.get("xray");
  const labResultId = searchParams.get("labId");
  const waitingId = searchParams.get("waitingId");
  const isAdmin = searchParams.get("isAdmin");

  const { latestDiagnosis } = useGetLatestDiagnosis(patientId);

  const { history: diagnosis } = useGetHistory(patientId);

  const navigate = useNavigate();

  function handleClick(date) {
    if (!isAdmin)
      navigate(
        `/doctor/:patientId/history/:patientId?date=${date}&patientId=${patientId}&waitingId=${waitingId}&labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}`,
      );
    else
      navigate(
        `/admin/:patientId/history/:patientId?date=${date}&patientId=${patientId}&waitingId=${waitingId}&labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}`,
      );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-md bg-white p-3">
        <h2 className="text-2xl">Patient History</h2>
        <div className="mt-4 grid grid-cols-2 gap-5">
          <div>
            <h3 className="font-bold">History of Present Illness</h3>
            <pre className="mt-1 whitespace-break-spaces font-primary">
              {latestDiagnosis?.presentIllness}
            </pre>
          </div>
          <div>
            <h3 className="font-bold">Risk Factor</h3>
            <pre className="mt-1 whitespace-break-spaces font-primary">
              {latestDiagnosis?.riskFactor}
            </pre>
          </div>
          <div>
            <h3 className="font-bold">Allergy History</h3>
            <pre className="mt-1 whitespace-break-spaces font-primary">
              {latestDiagnosis?.allergyHistory}
            </pre>
          </div>
          <div>
            <h3 className="font-bold">Undelying Chronic Illness</h3>
            <pre className="mt-1 whitespace-break-spaces font-primary">
              {latestDiagnosis?.underlyingChronicIllness}
            </pre>
          </div>
          <div>
            <h3 className="font-bold">Past Surgical History</h3>
            <pre className="mt-1 whitespace-break-spaces  font-primary">
              {latestDiagnosis?.pastSurgicalHistory}
            </pre>
          </div>
          <div>
            <h3 className="font-bold">Recent Admission</h3>
            <pre className="mt-1 whitespace-break-spaces  font-primary">
              {latestDiagnosis?.recentAdmission}
            </pre>
          </div>
          <div>
            <h3 className="font-bold">Personal/ Social/ Family History</h3>
            <pre className="mt-1 whitespace-break-spaces  font-primary">
              {latestDiagnosis?.familyHistory}
            </pre>
          </div>
        </div>
      </div>
      <div>
        <h2 className="mt-4 text-2xl">Diagnosis History</h2>
        <div className="mt-3 flex flex-col gap-2 ">
          {diagnosis?.map((diag) => {
            return (
              <div
                className="cursor-pointer rounded-md bg-white p-3 hover:bg-green-50 hover:text-green-800"
                onClick={() => handleClick(diag?.date)}
              >
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex gap-1">
                    <span>Opd:</span>
                    <span className="font-bold">{diag?.doctorId.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <span>Date:</span>
                    <span className="font-bold">
                      {convertDateTime(diag?.date)}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-1">
                  <h3 className="font-bold">Diagnosis</h3>
                  <pre className="whitespace-break-spaces font-primary">
                    {diag?.diagnosis}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DoctorViewPatientHistory;
