import { useState } from "react";
import useAddAppointment from "../../hooks/useAddAppointment";
import { usePatient } from "../../context/PatientContext";

const formatDate = (date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function DoctorScheduleAppointment() {
  const [date, setDate] = useState(() => formatDate(new Date()));
  const { mutate } = useAddAppointment();

  const { patient } = usePatient();
  const patientId = patient._id;

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ patientId, date: new Date(date).toISOString() });
  }

  return (
    <div className="rounded-md bg-white p-3">
      <h2 className="text-2xl">Schedule Appointment</h2>
      <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
        <label htmlFor="date" className="flex flex-col gap-1">
          <span className="ml-1 text-sm font-bold">Set date</span>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            type="date"
            className="rounded-md border-2 border-black/50 px-4 py-2 "
          />
        </label>
        <button
          type="submit"
          className="ml-auto block rounded-md bg-green-800 px-4 py-2 text-green-50"
        >
          Appoint
        </button>
      </form>
    </div>
  );
}

export default DoctorScheduleAppointment;
