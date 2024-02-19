import { useForm } from "react-hook-form";
import useUploadVitals from "./useUploadVitals";
import useGetPatient from "../../hooks/useGetPatient";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function RecordVitals({ waitingId, doctorId }) {
  const { register, handleSubmit } = useForm();

  const { userId } = useUser();

  const params = useParams();

  const { isLoading: patientLoading, patient: patient } = useGetPatient(
    params?.patientId
  );
  const { isLoading: vitalsLoading, mutate } = useUploadVitals();

  function onSubmit(value) {
    const {
      bloodPressure,
      height,
      oxygen,
      pulseRate,
      respiratoryRate,
      temperature,
      weight,
    } = value;

    const content = `Blood Pressure: ${bloodPressure} mmHg\nPulse Rate: ${pulseRate} bpm (beats per minute)\nRespiratory Rate: ${respiratoryRate} breaths per minute\nTemperature: ${temperature} °C\nOxygen Saturation: ${oxygen}%\nWeight: ${weight} kg\nHeight: ${height} cm
  `;

    const blob = new Blob([content], { type: "text/plain" });
    const patientId = patient.patient_id;

    console.log(patientId, userId, waitingId, doctorId);

    mutate({ blob, patientId, userId, waitingId, doctorId });
  }

  if (patientLoading) return <div>Loading</div>;

  if (patient && !vitalsLoading) {
    return (
      <form
        action=""
        className="flex flex-col gap-2 mt-3"
        onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="blood-pressure" className="flex flex-col gap-1">
          <span className="font-bold ml-1 text-sm">Blood Pressure</span>
          <input
            {...register("bloodPressure")}
            id="blood-pressure"
            type="text"
            placeholder="mmHg"
            className="border bg-gray-100 px-3 py-2 rounded-md focus:outline-blue-800"
          />
        </label>
        <label htmlFor="pulse-rate" className="flex flex-col gap-1">
          <span className="font-bold ml-1 text-sm">Pulse Rate</span>
          <input
            {...register("pulseRate")}
            id="pulse-rate"
            type="text"
            placeholder="/min"
            className="border bg-gray-100 px-3 py-2 rounded-md focus:outline-blue-800"
          />
        </label>
        <label htmlFor="respiratory" className="flex flex-col gap-1">
          <span className="font-bold ml-1 text-sm">Respiratory Rate</span>
          <input
            {...register("respiratoryRate")}
            id="respiratory"
            type="text"
            placeholder="/min"
            className="border bg-gray-100 px-3 py-2 rounded-md focus:outline-blue-800"
          />
        </label>
        <label htmlFor="temp" className="flex flex-col gap-1">
          <span className="font-bold ml-1 text-sm">Temperature</span>
          <input
            {...register("temperature")}
            id="temp"
            type="text"
            placeholder="&deg;c"
            className="border bg-gray-100 px-3 py-2 rounded-md focus:outline-blue-800"
          />
        </label>
        <label htmlFor="oxygen" className="flex flex-col gap-1">
          <span className="font-bold ml-1 text-sm">Oxygen Saturation</span>
          <input
            {...register("oxygen")}
            id="oxygen"
            type="text"
            placeholder="%"
            className="border bg-gray-100 px-3 py-2 rounded-md focus:outline-blue-800"
          />
        </label>
        <label htmlFor="weight" className="flex flex-col gap-1">
          <span className="font-bold ml-1 text-sm">Weight</span>
          <input
            {...register("weight")}
            id="weight"
            type="text"
            placeholder="kg"
            className="border bg-gray-100 px-3 py-2 rounded-md focus:outline-blue-800"
          />
        </label>
        <label htmlFor="height" className="flex flex-col gap-1">
          <span className="font-bold ml-1 text-sm">Height</span>
          <input
            {...register("height")}
            id="height"
            type="text"
            placeholder="cm"
            className="border bg-gray-100 px-3 py-2 rounded-md focus:outline-blue-800"
          />
        </label>
        <button className="bg-slate-800 text-slate-50 rounded-md p-2">
          Submit
        </button>
      </form>
    );
  } else {
    return <div>Loading</div>;
  }
}

export default RecordVitals;
