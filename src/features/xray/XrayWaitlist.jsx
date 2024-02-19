import { useNavigate } from "react-router-dom";
import useGetXrayWaitlist from "./useGetXrayWaitlist";

function XrayWaitlist() {
  const { waitlist } = useGetXrayWaitlist();

  const navigate = useNavigate();
  return (
    <div className="overflow-hidden rounded-md px-2 pt-3">
      <table className="w-full overflow-hidden rounded-md text-left text-black/70 rtl:text-right">
        <thead className="bg-green-800 text-sm uppercase text-green-50">
          <tr className="text-left">
            <th scope="col" className="px-6 py-3 ">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              OPD
            </th>
          </tr>
        </thead>
        <tbody>
          {waitlist?.map((item) => {
            return (
              <tr
                onClick={() => {
                  navigate(
                    `/xray/write-test?patientId=${item.patientId._id}&doctorId=${item.doctorId._id}&orderId=${item.orderId._id}&patientName=${item.patient_name}&queueId=${item.queueId}&doctorName=${item.doctorId.name}&waitingId=${item._id}`,
                  );
                }}
                className="cursor-pointer border-b bg-white hover:bg-black/10"
                key={item._id}
              >
                <td className="px-6 py-4 font-amharic font-bold text-slate-700">
                  {item.patientId.name}
                </td>
                <td className="px-6 py-4">{item.doctorId.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default XrayWaitlist;
