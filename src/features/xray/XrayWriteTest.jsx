import { useNavigate, useSearchParams } from "react-router-dom";
import useGetPatient from "../../hooks/useGetPatient";
import { useState } from "react";
import useAddXrayResult from "./useAddXrayResult";
import useGetXrayOrder from "./useGetXrayOrder";
import PrintTemplate from "../../components/PrintTemplate";
import { FaPrint } from "react-icons/fa";

function formatDate(date) {
  return new Date(date).toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function XrayWriteTest() {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patientId");
  const doctorName = searchParams.get("doctorName");
  const doctorId = searchParams.get("doctorId");
  const queueId = searchParams.get("queueId");
  const orderId = searchParams.get("orderId");
  const waitingId = searchParams.get("waitingId");
  const isExternal = searchParams.get("isExternal");

  const { patient } = useGetPatient(patientId);
  const { order } = useGetXrayOrder(orderId);
  const [techniquesText, setTechniquesText] = useState("");

  console.log(order);
  const { ipcRenderer } = window.require("electron");

  const handlePrint = () => {
    ipcRenderer.send("print");
  };

  const { mutate: addResult } = useAddXrayResult();

  function handleSubmit(e) {
    e.preventDefault();

    let xrayTechniques = "";

    for (const [key, value] of Object.entries(techniquesText)) {
      console.log(key, value);
      xrayTechniques += key + "\n";
      xrayTechniques += value + "\n\n";
    }

    addResult({
      queueId,
      orderId,
      doctorId,
      patientName: patient.name,
      patientId,
      waitingId,
      xrayTechniques,
    });
  }

  const navigate = useNavigate();

  return (
    <div className="p-3 ">
      <div className="rounded-md bg-white p-3">
        <button
          className="rounded-md border-2 border-slate-500 px-2 "
          onClick={() => {
            navigate("/xray");
          }}
        >
          &lt; Back
        </button>
        <div className="mt-6">
          <h2 className="text-lg font-bold">Patient Details</h2>
          <table className="mt-2">
            <tbody className="flex gap-6">
              <tr>
                <td>Name:</td>
                <td className="px-2 ">
                  <span className="font-amharic font-bold">
                    {isExternal ? order?.bid.name : patient?.name}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Age:</td>
                <td className="px-2 ">
                  <span className="font-bold">
                    {" "}
                    {isExternal ? order?.bid.age : patient?.age}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Sex:</td>
                <td className="px-2 ">
                  <span className="font-bold">
                    {" "}
                    {isExternal ? order?.bid.sex : patient?.gender}
                  </span>
                </td>
              </tr>
              <tr>
                <td>OPD:</td>
                <td className="px-2 ">
                  <span className="font-bold"> {doctorName}</span>
                </td>
              </tr>
              <tr>
                <td>Date:</td>
                <td className="px-2 ">
                  <span className="font-bold"> {formatDate(order?.date)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PrintTemplate
          patient={{
            name: order?.bid.name,
            age: order?.bid.age,
            gender: order?.bid.sex,
            cardNumber: "External",
          }}
        >
          <div className="mt-6">
            <h2 className="text-lg font-bold">Xray Order</h2>
            <p className="mt-2">
              {isExternal ? order?.externalOrder : order?.orderedTest}
            </p>
          </div>
          <div className="mt-6">
            <form action="" className="" onSubmit={handleSubmit}>
              {!isExternal && (
                <label htmlFor="techniques" className="flex flex-col gap-1">
                  {order?.orderedTest.split(", ").map((test) => {
                    return (
                      <div>
                        <span className="ml-1 mt-2 text-sm font-bold">
                          {test} Techniques
                        </span>
                        <textarea
                          value={techniquesText[test]}
                          onChange={(e) =>
                            setTechniquesText((prev) => ({
                              ...prev,
                              [test]: e.target.value,
                            }))
                          }
                          name=""
                          id="techniques"
                          cols="30"
                          rows="4"
                          placeholder="Techniques"
                          className="w-full rounded-md border-2 border-gray-500 px-3 py-1 focus:outline-blue-800"
                        ></textarea>
                      </div>
                    );
                  })}
                </label>
              )}
              {isExternal && (
                <label htmlFor="techniques" className="flex flex-col gap-1">
                  <div>
                    <span className="ml-1 mt-2 text-sm font-bold">
                      Techniques
                    </span>
                    <textarea
                      value={techniquesText["tech"]}
                      onChange={(e) =>
                        setTechniquesText((prev) => ({
                          ...prev,
                          ["tech"]: e.target.value,
                        }))
                      }
                      name=""
                      id="techniques"
                      cols="30"
                      rows="4"
                      placeholder="Techniques"
                      className="w-full rounded-md border-2 border-gray-500 px-3 py-1 focus:outline-blue-800"
                    ></textarea>
                  </div>
                </label>
              )}
              <div className="flex justify-end gap-2 print:hidden">
                <button
                  onClick={handlePrint}
                  className="mt-2 flex items-center gap-1 rounded-md border border-black/50 px-4 py-2 duration-100 hover:bg-green-900 hover:text-green-200"
                >
                  <FaPrint />
                  Print
                </button>
                <button
                  type="submit"
                  className=" mt-2 block rounded-md bg-green-800 px-4 py-2 text-green-50 duration-100 hover:bg-green-900"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </PrintTemplate>
      </div>
    </div>
  );
}

export default XrayWriteTest;
