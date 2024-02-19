import useGetVitals from "./useGetVitals";

function ShowVitals({ vitalsId }) {
  const { patientVitals } = useGetVitals(vitalsId);
  return (
    <div className="bg-white rounded-md p-4 mx-3">
      <h1 className="text-2xl">Patient Vitals</h1>
      <pre className="mt-4 font-primary">{patientVitals}</pre>
    </div>
  );
}

export default ShowVitals;
