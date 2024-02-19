import { useForm } from "react-hook-form";
import useAddActualDiagnosis from "./useAddActualDiagnosis";
import { usePatient } from "../../context/PatientContext";
import { useUser } from "../../context/UserContext";
import PrintTemplate from "../../components/PrintTemplate";
import { FaPrint } from "react-icons/fa";

function DoctorDiagnosis() {
  const { register, handleSubmit } = useForm();
  const { mutate } = useAddActualDiagnosis();
  const { patient } = usePatient();
  const { userId: doctorId } = useUser();

  function onSubmit(data) {
    mutate({ ...data, patientId: patient._id, doctorId });
    // console.log({ ...data, patientId: patient._id, doctorId });
  }

  const { ipcRenderer } = window.require("electron");

  const handlePrint = (e) => {
    e.preventDefault();
    ipcRenderer.send("print");
  };

  return (
    <PrintTemplate isPrescription={true} patient={patient} hideFoot={true}>
      <div className="rounded-md bg-white p-3">
        <div className="mt-4 flex  items-center justify-between text-2xl print:hidden print:font-bold">
          <h1 className="print:hidden print:text-lg">Prescription</h1>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-md border border-black/50 px-4 py-2 text-base hover:bg-green-800 hover:text-green-200 print:hidden"
          >
            <FaPrint />
            Print
          </button>
        </div>
        <form
          action=""
          className="mt-4 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            htmlFor="diagnosis"
            className="flex flex-col gap-1 print:hidden"
          >
            <span className="ml-1 text-sm font-bold">Diagnosis</span>
            <textarea
              {...register("diagnosis")}
              id="diagnosis"
              type="text"
              className="rounded-md border border-black/50 px-3 py-2"
              rows="4"
              placeholder="Write diagnosis"
            />
          </label>

          <label
            htmlFor="hTreatment"
            className="flex flex-col gap-1 print:hidden"
          >
            <span className="ml-1 text-sm font-bold">Hospital Treatment</span>
            <textarea
              {...register("hospitalTreatment")}
              id="hTreatment"
              type="text"
              className="rounded-md border border-black/50 px-3 py-2"
              rows="4"
              placeholder="Order hospital treatment"
            />
          </label>

          <label
            htmlFor="eTreatment"
            className="flex flex-col gap-1 print:flex"
          >
            <span className="ml-1 text-sm font-bold print:hidden">
              Prescription
            </span>
            <textarea
              {...register("prescription")}
              id="eTreatment"
              type="text"
              className="rounded-md border border-black/50 px-3 py-2 print:border-none"
              rows="4"
              placeholder="Order external treatment"
            />
          </label>

          <label
            htmlFor="progress"
            className="flex flex-col gap-1 print:hidden"
          >
            <span className="ml-1 text-sm font-bold">Progress Note</span>
            <textarea
              {...register("progressNote")}
              id="progress"
              type="text"
              className="rounded-md border border-black/50 px-3 py-2"
              rows="4"
              placeholder="Write progress note"
            />
          </label>
          <button className="rounded-md bg-green-800 py-2 text-green-50 hover:bg-green-900 hover:text-green-200 print:hidden">
            Submit
          </button>
        </form>
      </div>
    </PrintTemplate>
  );
}

export default DoctorDiagnosis;
