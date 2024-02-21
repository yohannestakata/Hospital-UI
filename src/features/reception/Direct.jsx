import useGetAllDoctorWaitingList from "./useGetAllDoctorWaitinglist";

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

function Direct() {
  const { isLoading, data } = useGetAllDoctorWaitingList();

  if (isLoading) return <div>Loading</div>;
  return (
    <div className="mx-2 overflow-hidden rounded-md bg-white p-3">
      <h2 className="text-2xl">ተረኛ ታካሚዎች</h2>
      <table className="mt-3 w-full overflow-hidden rounded-md text-left text-sm text-black/70 rtl:text-right">
        <thead className="bg-green-800 text-sm uppercase ">
          <tr className="text-left">
            <th scope="col" className="px-6 py-3  text-green-50">
              Name
            </th>
            <th scope="col" className="px-6 py-3  text-green-50">
              OPD
            </th>

            <th scope="col" className="px-6 py-3 text-green-50">
              Card Number
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
          {data?.data.data?.map((item) => {
            return (
              <tr
                className="border-b bg-white hover:bg-black/10"
                key={item._id}
              >
                <td className="px-6 py-3 font-bold text-black/70">
                  {item.patientId?.name}
                </td>
                <td className="px-6 py-3 font-bold text-black/70">
                  {item.doctorId?.name}
                </td>
                <td className="px-6 py-3 ">{item.patientId?.cardNumber}</td>
                <td className="px-6 py-3">{formatDateToTime(item.date)}</td>
                <td className="px-6 py-3 ">{formatDate(item.date)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Direct;
