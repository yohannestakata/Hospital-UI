import { useNavigate } from "react-router-dom";
import useGetLabWaitlist from "./useGetLabWaitlist";

function ViewLabResults() {
  const { waitlist } = useGetLabWaitlist();

  const navigate = useNavigate();
  return (
    <div className="p-3">
      <div className="overflow-hidden rounded-md ">
        <table className="w-full overflow-hidden text-left text-slate-800 rtl:text-right">
          <thead className="bg-green-800 text-sm uppercase text-green-50">
            <tr className="text-left">
              <th scope="col" className="px-6 py-3  ">
                Name
              </th>
              <th scope="col" className="px-6 py-3 ">
                OPD
              </th>
            </tr>
          </thead>
          <tbody>
            {waitlist?.map((item) => {
              console.log(item);
              if (!item.isExternal)
                return (
                  <tr
                    onClick={() => {
                      navigate(
                        `/lab/lab-results/write-test?patientId=${item.patientId._id}&queueId=${item.queueId}&orderId=${item.orderId}&doctorId=${item.doctorId._id}&doctorName=${item.doctorId.name}&waitingId=${item._id}`,
                      );
                    }}
                    className="cursor-pointer border-b bg-white hover:bg-black/10"
                    key={item._id}
                  >
                    <td className="px-6 py-4 font-amharic font-bold text-slate-700">
                      {item.patientId?.name}
                    </td>
                    <td className="px-6 py-4">{item?.doctorId?.name}</td>
                  </tr>
                );
              else {
                return (
                  <tr
                    onClick={() => {
                      navigate(
                        `/lab/lab-results/write-test?&orderId=${item.orderId}&waitingId=${item._id}&isExternal=${item.isExternal}&bid=${item.bid._id}`,
                      );
                    }}
                    className="cursor-pointer border-b bg-white hover:bg-black/10"
                    key={item._id}
                  >
                    <td className="px-6 py-4 font-amharic font-bold text-slate-700">
                      {item.bid.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-fit rounded-full bg-green-800 px-2 text-green-50">
                        External
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewLabResults;
