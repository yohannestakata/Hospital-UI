import { useState } from "react";
import useAddToWaitingList from "./useAddToWaitingList";
import useGetAppointments from "./useGetAppointments";
import useDeleteAppointment from "../../hooks/useDeleteAppointment";

function formatDate(date) {
  return new Date(date).toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ViewAppointments() {
  const { appointments } = useGetAppointments();
  const { mutate } = useAddToWaitingList();

  const [price, setPrice] = useState({});
  const { deleteAppointment } = useDeleteAppointment();

  function handleClick(fields, id) {
    console.log(id);
    mutate({ ...fields, price: price[fields.patientId] });
    deleteAppointment(id);
  }
  return (
    <div className="mx-2 overflow-hidden rounded-md bg-white p-3">
      <h2 className="text-2xl">Today's Appointments</h2>
      <table className="mt-3 w-full overflow-hidden rounded-md text-left text-sm text-black/70 ">
        <thead className="bg-green-800 text-sm uppercase ">
          <tr className="text-left">
            <th scope="col" className="px-6 py-3  text-green-50">
              Card Number
            </th>{" "}
            <th scope="col" className="px-6 py-3  text-green-50">
              Name
            </th>
            <th scope="col" className="px-6 py-3  text-green-50">
              OPD
            </th>
            <th scope="col" className="px-6 py-3 text-green-50">
              Appointment Date
            </th>
            <th scope="col" className="px-6 py-3 text-green-50">
              Payment
            </th>
            <th scope="col" className="px-6 py-3 text-green-50">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((item) => {
            return (
              <tr
                key={item.appointment_id}
                className="border-b bg-white hover:bg-black/10"
              >
                <td className="px-6 py-2 ">{item.patientId.cardNumber}</td>
                <td className="px-6 py-2 font-bold text-black/70">
                  {item.patientId.name}
                </td>
                <td className="px-6 py-2 ">{item.doctorId.name}</td>
                <td className="px-6 py-2">{formatDate(item.date)}</td>
                <td>
                  <form action="">
                    <input
                      type="number"
                      className="w-20 rounded-md border border-black/50 bg-black/5 px-2 py-1"
                      placeholder="Price"
                      onChange={(e) =>
                        setPrice((price) => {
                          return {
                            ...price,
                            [item.patientId._id]: e.target.value,
                          };
                        })
                      }
                      value={price[item.patientId._id]}
                    />
                  </form>
                </td>
                <td className="px-6 py-2">
                  <button
                    className="rounded-md bg-green-800 px-4 py-1 text-green-50"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(
                        {
                          patientId: item.patientId._id,
                          doctorId: item.doctorId._id,
                        },
                        item._id,
                      );
                    }}
                  >
                    Add
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAppointments;
