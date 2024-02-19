import {
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { usePatient } from "../context/PatientContext";
import useDeleteFromDoctorWailist from "../hooks/useDeleteFromDoctorWaitlist";

import {
  FaAngleLeft,
  FaClipboardList,
  FaXRay,
  FaBookOpenReader,
  FaFlaskVial,
  FaRegCalendarDays,
  FaPersonCircleQuestion,
  FaPencil,
} from "react-icons/fa6";
import { FaCheckCircle, FaClipboardCheck, FaWifi } from "react-icons/fa";

function DoctorLayout() {
  const { patient } = usePatient();
  const [searchParams] = useSearchParams();
  const vitalsId = searchParams.get("vitals");
  const ultrasoundResultId = searchParams.get("ultrasound");
  const xrayResultId = searchParams.get("xray");
  const labResultId = searchParams.get("labId");
  const waitingId = searchParams.get("waitingId");
  const navigate = useNavigate();

  const { mutate } = useDeleteFromDoctorWailist();
  function handleFinish() {
    mutate(waitingId);
  }

  return (
    <div className="h-full overflow-hidden">
      <div className="flex h-screen p-2 ">
        <div className="flex h-full w-72 flex-col gap-1 overflow-auto rounded-md bg-white p-3">
          <div className="flex flex-col gap-1 border-b">
            <span className="mb-1 text-sm opacity-70">Examination</span>
            <NavLink
              to={`/doctor/:patientId/history?labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}&waitingId=${waitingId}&patientId=${patient._id}`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaBookOpenReader className="opacity-70" />
              Patient history
            </NavLink>
            <NavLink
              to={`/doctor/:patientId/diagnosis?labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}&waitingId=${waitingId}&patientId=${patient._id}`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaClipboardList className="opacity-70" />
              Examination
            </NavLink>
          </div>
          <div className="flex flex-col gap-1 border-b py-2">
            <span className="mb-1 text-sm opacity-70">Order test</span>
            <NavLink
              to={`/doctor/${patient.patient_id}/order-lab?labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}&waitingId=${waitingId}&patientId=${patient._id}`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaClipboardCheck className="opacity-70" />
              Order
            </NavLink>
          </div>
          <div className="flex flex-col gap-1 border-b py-2">
            <span className="mb-1 text-sm opacity-70">Test results</span>
            {/* <NavLink
              to={`/doctor/:patientId/vitals?labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}&waitingId=${waitingId}&patientId=${patient._id}`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaTemperatureLow className="opacity-70" />
              Vitals result
            </NavLink> */}
            <NavLink
              to={`/doctor/:patientId/lab-results?labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}&waitingId=${waitingId}&patientId=${patient._id}`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaFlaskVial className="opacity-70" />
              Laboratory result
            </NavLink>
            <NavLink
              to={`/doctor/:patientId/ultra-results?labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}&waitingId=${waitingId}&patientId=${patient._id}`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaWifi className="opacity-70" />
              Ultrasound result
            </NavLink>
            <NavLink
              to={`/doctor/:patientId/xray-results?labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}&waitingId=${waitingId}&patientId=${patient._id}`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaXRay className="opacity-70" />
              X-ray result
            </NavLink>
          </div>
          <div className="flex flex-col gap-1 border-b py-2">
            <span className="mb-1 text-sm opacity-70">Diagnosis</span>

            <NavLink
              to={`/doctor/:patientId/diagnosis2?labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}&waitingId=${waitingId}&patientId=${patient._id}`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaPersonCircleQuestion className="opacity-70" />
              Diagnosis
            </NavLink>
          </div>
          <div className="flex flex-col gap-1 border-b py-2">
            <span className="mb-1 text-sm opacity-70">Appointments</span>

            <NavLink
              to={`/doctor/:patientId/appointment?labId=${labResultId}&ultrasound=${ultrasoundResultId}&xray=${xrayResultId}&vitals=${vitalsId}&waitingId=${waitingId}&patientId=${patient._id}`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaRegCalendarDays className="opacity-70" />
              Schedule Appointment
            </NavLink>
          </div>
        </div>
        <div className="mx-3 h-full flex-1 overflow-y-auto">
          <div className="sticky top-0 z-50 w-full rounded-md bg-white px-3 py-2 shadow-md ">
            <div className=" flex items-center justify-between">
              <table className="flex text-left">
                <tbody className="flex">
                  <table className="flex items-center gap-6">
                    <tr>
                      <th className="font-normal">
                        <button className="flex h-full items-center rounded-md border border-black/50 p-1 hover:bg-black/10">
                          <FaPencil />
                        </button>
                      </th>
                    </tr>
                    <tr>
                      <th className="font-normal">Patient: </th>
                      <td className="py-1 pl-2 font-amharic font-bold">
                        {patient?.name}
                      </td>
                    </tr>
                    <tr>
                      <th className="font-normal">Age: </th>
                      <td className="py-1 pl-2 font-bold">{patient?.age}</td>
                    </tr>
                    <tr>
                      <th className="font-normal">Gender: </th>
                      <td className="py-1 pl-2 font-bold">{patient?.gender}</td>
                    </tr>
                  </table>
                </tbody>
              </table>
              <div className="ml-auto flex  gap-2 ">
                <button
                  className="flex items-center gap-1 rounded-md border-black/50 px-2 py-1 text-left duration-75 hover:gap-2 hover:text-green-800"
                  onClick={() => navigate("/doctor")}
                >
                  <FaAngleLeft /> Back
                </button>
                <button
                  onClick={handleFinish}
                  to={"/reception/waitlist"}
                  className="flex items-center gap-2 rounded-md border border-black/50 border-green-800 px-2 py-1 text-left duration-75 hover:bg-green-900 hover:text-green-200"
                >
                  <FaCheckCircle className="opacity-70" />
                  Finish
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorLayout;
