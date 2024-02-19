import { useNavigate } from "react-router-dom";
import useGetDoctorWaitingList from "./useGetDoctorWaitingList";
import { usePatient } from "../../context/PatientContext";
import Loading from "../../components/Loading";

function formatDateToTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatDate(date) {
  return new Date(date).toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function DoctorWaitingList() {
  const { isLoading, data } = useGetDoctorWaitingList();
  const navigate = useNavigate();
  const { setPatient } = usePatient();

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-hidden rounded-md">
      <table className="w-full overflow-hidden text-left text-gray-700 rtl:text-right">
        <thead className="bg-green-800 text-sm uppercase ">
          <tr className="text-left">
            <th scope="col" className="px-6 py-3  text-green-50">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-green-50">
              Lab Result
            </th>
            <th scope="col" className="px-6 py-3  text-green-50">
              Ultrasound Result
            </th>
            <th scope="col" className="px-6 py-3 text-green-50">
              X-ray Result
            </th>
            <th scope="col" className="px-6 py-3  text-green-50">
              Time registered
            </th>
            <th scope="col" className="px-6 py-3 text-green-50">
              Day registered
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data.data.map((item) => {
            const patient = item.patientId;
            return (
              <tr
                onClick={() => {
                  setPatient(patient);
                  navigate(
                    `/doctor/${patient?._id}?labId=${item.queueId?.labResultId}&ultrasound=${item.queueId?.ultrasoundResultId}&xray=${item.queueId?.xrayResultId}&vitals=${patient?.vitals_id}&waitingId=${item._id}`,
                  );
                }}
                className="cursor-pointer border-b bg-white hover:bg-black/10"
                key={patient?.waiting_id}
              >
                <td className="px-6 py-4 font-amharic font-medium text-slate-700">
                  {patient?.name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`${item?.queueId?.labStatus === "ready" ? "border-green-800 bg-green-50 text-green-800" : item?.queueId?.labStatus === "pending" ? "border-yellow-800 bg-yellow-50 text-yellow-800" : "border-black/95 bg-black/5 text-black/95"} mx-auto block w-fit rounded-full border px-2 text-sm font-bold`}
                  >
                    {item?.queueId?.labStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`${item?.queueId?.ultrasoundStatus === "ready" ? "border-green-800 bg-green-50 text-green-800" : item?.queueId?.ultrasoundStatus === "pending" ? "border-yellow-800 bg-yellow-50 text-yellow-800" : "border-black/95 bg-black/5 text-black/95"} mx-auto block w-fit rounded-full border px-2 text-sm font-bold`}
                  >
                    {item?.queueId?.ultrasoundStatus}
                  </span>
                </td>
                <td className="px-6 py-4 ">
                  <span
                    className={`${item?.queueId?.xrayStatus === "ready" ? "border-green-800 bg-green-50 text-green-800" : item?.queueId?.xrayStatus === "pending" ? "border-yellow-800 bg-yellow-50 text-yellow-800" : "border-black/95 bg-black/5 text-black/95"} mx-auto block w-fit rounded-full border px-2 text-sm font-bold`}
                  >
                    {item?.queueId?.xrayStatus}
                  </span>
                </td>
                <td className="px-6 py-4">{formatDateToTime(item?.date)}</td>
                <td className="px-6 py-4 ">{formatDate(item?.date)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorWaitingList;
