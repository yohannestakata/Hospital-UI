import { useNavigate } from "react-router-dom";
import useGetNurseWaitingList from "./useGetNurseWaitingList";

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

function NurseWaitingList() {
  const { isLoading, data } = useGetNurseWaitingList();
  const navigate = useNavigate();

  return (
    <table className="w-full text-left border rtl:text-right rounded-md overflow-hidden">
      <thead className="bg-slate-800 text-gray-50">
        <tr className="text-left text-gray-50">
          <th className="p-3 text-gray-50">Name</th>
          <th className="p-3 text-gray-50">Age</th>
          <th className="p-3 text-gray-50">Alregy</th>
          <th className="p-3 text-gray-50">OPD</th>
          <th className="p-3 text-gray-50">Card Number</th>
          <th className="p-3 text-gray-50">Time registered</th>
          <th className="p-3 text-gray-50">Day registered</th>
        </tr>
      </thead>
      <tbody>
        {data?.data.data.map((item) => {
          return (
            <tr
              onClick={() =>
                navigate(
                  `/nurse/${item.patient_id}?waitingId=${item.waiting_id}&doctorId=${item.doctor_id}`
                )
              }
              className="odd:bg-gray-100 border-b hover:bg-blue-100 cursor-pointer"
              key={item.waiting_id}>
              <td className="p-3">{item.patient_name}</td>
              <td className="p-3">{item.age}</td>
              <td className="p-3">{item.alergy}</td>
              <td className="p-3">{item.staff_name}</td>
              <td className="p-3 ">{item.cardNumber}</td>
              <td className="p-3 ">
                {formatDateToTime(item.added_to_waiting_date)}
              </td>
              <td className="p-3 ">{formatDate(item.added_to_waiting_date)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default NurseWaitingList;
