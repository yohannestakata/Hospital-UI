import { useEffect, useState } from "react";
import useAddToWaitingList from "./useAddToWaitingList";
import { useGetDoctors } from "../../hooks/useGetDoctors";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Search({ onSubmit, value, setValue, patient, data }) {
  const { mutate } = useAddToWaitingList();
  const [price, setPrice] = useState({});
  const [doc, setDoc] = useState({});

  const { doctors } = useGetDoctors();

  const navigate = useNavigate();

  useEffect(() => {
    return data?.data.data?.forEach((data) => {
      setDoc((prev) => {
        return { ...prev, [data._id]: data.opd };
      });
    });
  }, [data]);

  function handleSubmit(patientId, doctorId, price) {
    mutate({
      patientId,
      doctorId,
      price,
    });
  }

  function handleEdit(id) {
    navigate(`/reception/editPatient/${id}`);
  }

  const getDaysAgo = (date) => {
    const now = moment();
    const registrationDate = moment(date);

    return now.diff(registrationDate, "days");
  };

  return (
    <div className="h-full px-2">
      <form className="flex items-center gap-2" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search card number"
          className="w-full rounded-md border border-black/50 px-4 py-2  focus:outline-blue-800"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button className="rounded-md bg-green-800 px-4 py-2 text-slate-50">
          Search
        </button>
      </form>
      <div className="mt-3 flex w-full justify-center rounded-md border border-black/50">
        {!patient ? (
          <span className="m-2 rounded-md bg-red-800 px-4 py-2 text-red-50">
            ታካሚ አልተመዘገበም
          </span>
        ) : (
          <div className="w-full rounded-md bg-white p-3">
            <h2 className="text-2xl">የታካሚ መረጃ</h2>
            <table className="mt-3 w-full text-sm ">
              <thead className="text-left ">
                <tr className="bg-green-800 text-green-50 ">
                  <th className="rounded-l-md p-2 px-4 font-normal text-slate-50">
                    ካርድ ቁጥር
                  </th>
                  <th className="px-4 py-2 font-normal text-slate-50">ስም</th>
                  <th className="px-4 py-2 font-normal text-slate-50">ጾታ</th>
                  <th className="px-4 py-2 font-normal text-slate-50">ኣድሜ</th>
                  <th className="px-4 py-2 font-normal text-slate-50">ስልክ</th>
                  <th className="px-4 py-2 font-normal text-slate-50">ሃኪም</th>
                  <th className="px-4 py-2 font-normal text-slate-50">
                    የመጨረሻ ክፍያ
                  </th>
                  <th className="px-4 py-2 font-normal text-slate-50">ክፍያ</th>
                  <th className="rounded-r-md px-4 py-2 font-normal text-slate-50">
                    ሂድት
                  </th>
                </tr>
              </thead>
              {
                <tbody className="font-bold">
                  {data?.data.data?.map((patient) => {
                    return (
                      <tr>
                        <td className="p-2 px-4">{patient.cardNumber}</td>
                        <td className="p-2 px-4">{patient.name}</td>
                        <td className="p-2 px-4">
                          {patient.gender === "male" ? "ወንድ" : "ሴት"}
                        </td>
                        <td className="p-2 px-4">{patient.age}</td>
                        <td className="p-2 px-4">{patient.phone}</td>
                        <td className="p-2 px-4">
                          {
                            <select
                              name=""
                              id=""
                              className="rounded-md border-2 border-slate-500 px-2 py-1 focus:outline-blue-800"
                              value={doc[patient._id]}
                              onChange={(e) =>
                                setDoc((prev) => {
                                  return {
                                    ...prev,
                                    [patient._id]: e.target.value,
                                  };
                                })
                              }
                            >
                              {doctors.map((doc) => {
                                console.log(doc._id);
                                return (
                                  <option value={doc._id} key={doc._id}>
                                    {doc.name}
                                  </option>
                                );
                              })}
                            </select>
                          }
                        </td>
                        <td
                          className={`p-2 px-4 ${
                            getDaysAgo(patient.registrationDate) < 10
                              ? "text-green-800"
                              : "text-red-800"
                          }`}
                        >
                          {getDaysAgo(patient.registrationDate) + " ቀናት በፊት"}
                        </td>
                        <td className="p-2 px-4">
                          {
                            <input
                              className="w-20 rounded-md border-2 border-slate-500 px-2 py-1 focus:outline-blue-800 disabled:opacity-50"
                              placeholder="Price"
                              type="number"
                              value={price[patient._id]}
                              disabled={
                                getDaysAgo(patient.registrationDate) < 10
                              }
                              onChange={(e) => {
                                setPrice((prev) => {
                                  return {
                                    ...prev,
                                    [patient._id]: e.target.value,
                                  };
                                });
                              }}
                            />
                          }
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              className="w-full rounded-md  border border-black/50 px-4 py-1 text-sm font-normal hover:bg-green-900 hover:text-green-200"
                              onClick={(e) => {
                                e.preventDefault();
                                handleEdit(patient._id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="w-full rounded-md bg-green-800 px-4 py-1 text-sm font-normal text-green-50 hover:bg-green-900 hover:text-green-200"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSubmit(
                                  patient._id,
                                  doc[patient._id],
                                  price[patient._id],
                                );
                              }}
                            >
                              ላክ
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              }
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
