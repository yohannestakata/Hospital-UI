import useGetPatient from "../../hooks/useGetPatient";
import { useGetDoctors } from "../../hooks/useGetDoctors";
import useGetLabOrders from "./useGetLabOrders";
import { useState } from "react";
import useGetUltraOrder from "./useGetUltraOrder";
import useGetXrayOrder from "./useGetXrayOrder";
import useRejectOrder from "./useRejectOrder";
import useApproveOrder from "./useApproveOrder";
import useGetTreatment from "./useGetTreatment";

function ApprovePatientDetails({
  doctorId,
  patientId,
  labOrderId,
  ultrasoundOrderId,
  xrayOrderId,
  vitalsId,
  medicineId,
  waitingId,
  ecg,
  earIrrigation,
}) {
  if (ecg === "null") ecg = "undefined";
  if (earIrrigation === "null") earIrrigation = "undefined";

  const [ultraPrice, setUltraPrice] = useState(0);
  const [xrayPrice, setXrayPrice] = useState(0);
  const [labPrice, setLabPrice] = useState(0);
  const [medicinePrice, setMedicinePrice] = useState(0);
  const [othersPrice, setOthersPrice] = useState(0);
  const [ecgPrice, setEcgPrice] = useState(0);
  const [earPrice, setEarPrice] = useState(0);

  const { labOrders } = useGetLabOrders(labOrderId);
  const { ultraOrder } = useGetUltraOrder(ultrasoundOrderId);
  const { xrayOrder } = useGetXrayOrder(xrayOrderId);
  const { patient } = useGetPatient(patientId);
  const { treatment } = useGetTreatment(medicineId);

  const { doctors } = useGetDoctors();
  const { rejectOrder } = useRejectOrder();
  const { approveOrder } = useApproveOrder();

  const doctor = doctors?.filter((doc) => doc._id == doctorId)[0];

  const groupedLabOrders = labOrders?.data.data.orderedTests.reduce(
    (acc, current) => {
      const { type, ...rest } = current;
      const existingType = acc.find((item) => item.type === type);

      if (existingType) {
        existingType.data.push(rest);
      } else {
        acc.push({ type, data: [rest] });
      }

      return acc;
    },
    [],
  );

  function handleReject(e) {
    e.preventDefault();
    rejectOrder(waitingId);
  }

  function handleApprove(e) {
    e.preventDefault();
    approveOrder({
      doctorId,
      patientId,
      labOrderId,
      ultrasoundOrderId,
      xrayOrderId,
      vitalsId,
      waitingId,
      ultraPrice,
      labPrice,
      xrayPrice,
      medicinePrice,
      othersPrice,
      earPrice,
      ecgPrice,
    });
  }

  return (
    <div className="mx-2">
      <h1 className="text-2xl">Orders</h1>
      <div className="mt-2 rounded-md bg-white p-4">
        <h2 className="text-lg">Patient Details</h2>
        <table className=" mt-2 rounded-md">
          <tbody className="flex gap-6">
            <tr>
              <td>Patient name:</td>
              <td className="pl-2 font-bold">{patient?.name}</td>
            </tr>
            <tr>
              <td>OPD:</td>
              <td className="pl-2 font-bold">{doctor?.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        className={`mt-3 grid grid-cols-2 gap-9 rounded-md bg-white p-3 ${
          labOrders?.data.data.orderedTests.length && "border-l-4"
        }  border-green-800`}
      >
        <div>
          <h2 className="text-lg">Lab Order</h2>
          <table className="mt-1">
            <tbody>
              {groupedLabOrders?.map((orders) => (
                <tr key={orders.id}>
                  <td>{orders.type}: </td>
                  <td className="py-1 pl-2 font-bold">
                    {orders?.data.map((name) => (
                      <span key={name._id}> {name.name + ", "}</span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form action="" className="mt-3 flex gap-2 ">
          <label htmlFor="lab-price" className="flex flex-col gap-1">
            <span className="ml-1 text-sm font-bold">Lab Order Price</span>
            <input
              min={0}
              disabled={!labOrders?.data.data.orderedTests.length}
              type="number"
              name=""
              id="lab-price"
              placeholder="Br"
              autoFocus
              className="focus:ouline-blue-800 rounded-md border-2 border-gray-500 px-3 py-1 outline-blue-800 disabled:opacity-40"
              value={labPrice}
              onChange={(e) => setLabPrice(e.target.value)}
            />
          </label>
        </form>
      </div>

      <div
        className={`mt-3 grid grid-cols-2 gap-9 rounded-md bg-white p-3 ${
          ultraOrder && "border-l-4"
        }  border-green-800`}
      >
        <div>
          <h2 className="text-lg">Ultrasound Order</h2>
          <p className="mt-2 font-bold">{ultraOrder?.orderedTest}</p>
        </div>
        <form action="" className="flex gap-2 ">
          <label htmlFor="ultra-price" className="flex flex-col gap-2">
            <span className="ml-1 text-sm font-bold">
              Ultrasound Order Price
            </span>
            <input
              min={0}
              disabled={!ultraOrder}
              type="number"
              name=""
              id="ultra-price"
              placeholder="Br"
              className="focus:ouline-blue-800 rounded-md border-2 border-gray-500 px-3 py-1 outline-blue-800 disabled:opacity-40"
              value={ultraPrice}
              onChange={(e) => setUltraPrice(e.target.value)}
            />
          </label>
        </form>
      </div>

      <div
        className={`mt-3 grid grid-cols-2 gap-9 rounded-md bg-white p-3 ${
          xrayOrder && "border-l-4"
        }  border-green-800`}
      >
        <div>
          <h2 className="text-lg">X-ray Order</h2>
          <p className="mt-2 font-bold">{xrayOrder?.orderedTest}</p>
        </div>
        <form action="" className="flex gap-2 ">
          <label htmlFor="xray-price" className="flex flex-col gap-1">
            <span className="ml-1 text-sm font-bold">X-ray Order Price</span>
            <input
              min={0}
              disabled={!xrayOrder}
              type="number"
              name=""
              id="xray-price"
              placeholder="Br"
              className="focus:ouline-blue-800 rounded-md border-2 border-gray-500 px-3 py-1 outline-blue-800 disabled:opacity-40"
              value={xrayPrice}
              onChange={(e) => setXrayPrice(e.target.value)}
            />
          </label>
        </form>
      </div>

      <div
        className={`mt-3 grid grid-cols-2 gap-9 rounded-md bg-white p-3 ${
          ecg === "undefined" ? "" : "border-l-4"
        }  border-green-800`}
      >
        <div>
          <h2 className="text-lg">ECG Order</h2>
          <p className="mt-2 font-bold text-green-800">
            {ecg !== "undefined" ? "Ordered" : ""}
          </p>
        </div>
        <form action="" className="flex gap-2 ">
          <label htmlFor="ecg-price" className="flex flex-col gap-1">
            <span className="ml-1 text-sm font-bold">ECG Price</span>
            <input
              min={0}
              disabled={ecg === "undefined"}
              type="number"
              name=""
              id="ecg-price"
              placeholder="Br"
              className="focus:ouline-blue-800 rounded-md border-2 border-gray-500 px-3 py-1 outline-blue-800 disabled:opacity-40"
              value={ecgPrice}
              onChange={(e) => setEcgPrice(e.target.value)}
            />
          </label>
        </form>
      </div>

      <div
        className={`mt-3 grid grid-cols-2 gap-9 rounded-md bg-white p-3 ${
          earIrrigation !== "undefined" ? "border-l-4" : ""
        }  border-green-800`}
      >
        <div>
          <h2 className="text-lg">Ear Irrigation Order</h2>
          <p className="mt-2 font-bold text-green-800">
            {earIrrigation !== "undefined" && "Ordered"}
          </p>
        </div>
        <form action="" className="flex gap-2 ">
          <label htmlFor="ear-price" className="flex flex-col gap-1">
            <span className="ml-1 text-sm font-bold">Ear Irrigation Price</span>
            <input
              min={0}
              disabled={earIrrigation === "undefined"}
              type="number"
              name=""
              id="ear-price"
              placeholder="Br"
              className="focus:ouline-blue-800 rounded-md border-2 border-gray-500 px-3 py-1 outline-blue-800 disabled:opacity-40"
              value={earPrice}
              onChange={(e) => setEarPrice(e.target.value)}
            />
          </label>
        </form>
      </div>

      <div
        className={`mt-3 grid grid-cols-2 gap-9 rounded-md bg-white p-3 ${
          treatment ? "border-l-4" : ""
        }  border-green-800`}
      >
        <div>
          <h2 className="text-lg">Treatment Order</h2>
          <p className="mt-2 font-bold">
            {treatment ? treatment?.hospitalTreatment : "None"}
          </p>
        </div>
        <form action="" className="flex gap-2 ">
          <label htmlFor="xray-price" className="flex flex-col gap-1">
            <span className="ml-1 text-sm font-bold">
              Treatment Order Price
            </span>
            <input
              min={0}
              disabled={!treatment}
              type="number"
              name=""
              id="xray-price"
              placeholder="Br"
              className="focus:ouline-blue-800 rounded-md border-2 border-gray-500 px-3 py-1 outline-blue-800 disabled:opacity-40"
              value={medicinePrice}
              onChange={(e) => setMedicinePrice(e.target.value)}
            />
          </label>
        </form>
      </div>

      <div className="flex gap-3">
        <div className="mt-3 grid flex-1 grid-cols-1 gap-2 rounded-md bg-white p-3">
          <div>
            <h2 className="text-lg">Additional Price</h2>
          </div>
          <form action="" className="flex gap-2 ">
            <label htmlFor="additional-price" className="flex flex-col gap-1">
              <span className="ml-1 text-sm font-bold">Additional Price</span>
              <input
                min={0}
                type="number"
                name=""
                id="additional-price"
                placeholder="Br"
                className="focus:ouline-blue-800 rounded-md border-2 border-gray-500 px-3 py-1 outline-blue-800"
                value={othersPrice}
                onChange={(e) => setOthersPrice(e.target.value)}
              />
            </label>
          </form>
        </div>

        <div className="mt-3 flex-1 rounded-md bg-white p-3">
          <h2 className="text-lg">Total Payment</h2>
          <form action="" className="mt-2 flex items-end gap-2">
            <label htmlFor="total" className="flex flex-col gap-1">
              <span className="ml-1 text-sm font-bold">Total Price</span>
              <input
                min={0}
                type="number"
                name=""
                id="total"
                placeholder="Br"
                className="focus:ouline-blue-800 rounded-md border-2 border-gray-500 px-3 py-1 outline-blue-800"
                value={
                  (parseFloat(labPrice) || 0) +
                  (parseFloat(xrayPrice) || 0) +
                  (parseFloat(ultraPrice) || 0) +
                  (parseFloat(medicinePrice) || 0) +
                  (parseFloat(othersPrice) || 0) +
                  (parseFloat(ecgPrice) || 0) +
                  (parseFloat(earPrice) || 0)
                }
              />
            </label>
            <div className="space-x-1">
              <button
                className="rounded-md bg-gray-200  px-4 py-2 text-sm duration-100 hover:bg-red-700 hover:text-red-50 "
                onClick={handleReject}
              >
                Reject
              </button>
              <button
                className="rounded-md bg-green-800 px-4 py-2 text-sm text-green-50   duration-100 hover:bg-green-900"
                onClick={handleApprove}
              >
                Approve
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApprovePatientDetails;
