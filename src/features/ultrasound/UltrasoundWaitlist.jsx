import { useNavigate } from "react-router-dom";
import useGetUltraWaitlist from "./useGetUltraWaitlist";

function UltrasoundWaitlist() {
  const { waitlist } = useGetUltraWaitlist();

  const navigate = useNavigate();
  return (
    <div className="overflow-hidden rounded-md px-2 pt-3">
      <table className="w-full overflow-hidden rounded-md text-left text-slate-800 rtl:text-right">
        <thead className="bg-green-800 text-sm uppercase ">
          <tr className="text-left">
            <th scope="col" className="px-6 py-3  text-slate-50">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-slate-50">
              OPD
            </th>
            <th scope="col" className="px-6 py-3 text-slate-50">
              Order
            </th>
          </tr>
        </thead>
        <tbody>
          {waitlist?.map((item) => {
            console.log(item, item.orderId.type);
            if (!item.isExternal)
              return (
                <tr
                  onClick={() => {
                    navigate(
                      `/ultrasound/${item.orderId.type}?patientId=${item.patientId._id}&doctorId=${item.doctorId._id}&orderId=${item.orderId._id}&patientName=${item.patientId.name}&queueId=${item.queueId}&doctorName=${item.doctorId.name}&waitingId=${item._id}&xrayTechniques=${item.orderId.xrayTechniques}`,
                    );
                  }}
                  className="cursor-pointer border-b bg-white hover:bg-black/10"
                  key={item._id}
                >
                  <td className="px-6 py-4 font-amharic font-bold text-slate-700">
                    {item.patientId.name}
                  </td>
                  <td className="px-6 py-4">{item?.doctorId?.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        item.orderId.type === "Ultrasound" ||
                        item.orderId.type === "ultrasound"
                          ? "bg-violet-800 text-violet-50"
                          : "bg-rose-800 text-rose-50"
                      } rounded-full px-2 `}
                    >
                      {item.orderId.type}
                    </span>
                  </td>
                </tr>
              );
            else {
              return (
                <tr
                  onClick={() => {
                    navigate(
                      `/ultrasound/${item.orderId.type}?&orderId=${item.orderId._id}&patientName=${item.bid.name}&doctorName=${"External"}&waitingId=${item._id}&isExternal=${true}`,
                    );
                  }}
                  className="cursor-pointer border-b bg-white hover:bg-black/10"
                  key={item._id}
                >
                  <td className="px-6 py-4 font-amharic font-bold text-slate-700">
                    {item.bid.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex w-fit items-center rounded-full bg-green-800 px-2 text-green-50">
                      External
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        item.orderId.type === "Ultrasound" ||
                        item.orderId.type === "ultrasound"
                          ? "bg-violet-800 text-violet-50"
                          : "bg-rose-800 text-rose-50"
                      } rounded-full px-2 `}
                    >
                      {item.orderId.type}
                    </span>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UltrasoundWaitlist;
