import { useState } from "react";
import { useEffect } from "react";
import useGetIncome from "../../hooks/useGetIncome";
import { FaPrint } from "react-icons/fa";
import PrintTemplate from "../../components/PrintTemplate";

function sumSimilarAttributes(data) {
  const summedObject = {
    cardFee: 0,
    lab: 0,
    treatment: 0,
    otherFee: 0,
    ultrasound: 0,
    xray: 0,
    bid: 0,
    earIrrigation: 0,
    ecg: 0,
  };

  for (const item of data) {
    for (const key in summedObject) {
      if (item[key] !== null && !isNaN(parseFloat(item[key]))) {
        summedObject[key] += parseFloat(item[key]);
      }
    }
  }

  return summedObject;
}

function Admin() {
  const [selectedDate, setSelectedDate] = useState("");

  const { data } = useGetIncome(selectedDate);

  console.log(data);
  const sum = data
    ? sumSimilarAttributes(data)
    : {
        cardFee: 0,
        lab: 0,
        treatment: 0,
        otherFee: 0,
        ultrasound: 0,
        xray: 0,
        bid: 0,
        earIrrigation: 0,
        ecg: 0,
      };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  }, []);

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const { ipcRenderer } = window.require("electron");

  const handlePrint = () => {
    ipcRenderer.send("print");
  };

  return (
    <PrintTemplate hideFoot={true}>
      <AdminTable
        handlePrint={handlePrint}
        sum={sum}
        selectedDate={selectedDate}
        handleChange={handleChange}
      />
    </PrintTemplate>
  );
}

export default Admin;

function AdminTable({ handlePrint, sum, selectedDate, handleChange }) {
  return (
    <div className="mx-auto flex flex-col gap-2 rounded-md bg-white  p-3 print:text-sm ">
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-2xl print:text-lg print:font-bold">
          Daily Income
        </h1>
        <button
          className="flex items-center gap-3 rounded-md bg-green-800 px-4 py-2 text-green-50 print:invisible"
          onClick={handlePrint}
        >
          <FaPrint />
          Print
        </button>
      </div>
      <div className="flex-1">
        <form action="" className="w-full">
          <input
            type="date"
            name=""
            id=""
            className="w-full rounded-md border border-slate-600 px-6 py-2 focus:outline-blue-800"
            value={selectedDate}
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="flex-1 overflow-hidden rounded-md">
        <table className="w-full rounded-md border border-black/50 text-left text-sm">
          <thead className="bg-green-800 print:bg-white print:text-black">
            <tr>
              <th className="px-6 py-2 text-slate-50">Reason</th>
              <th className="px-6 py-2 text-slate-50">Income</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-400">
              <th className="px-6 py-2">Card</th>
              <td className="px-6 py-2">{sum.cardFee}</td>
            </tr>
            <tr className="border-b border-slate-400">
              <th className="px-6 py-2">Laboratory</th>
              <td className="px-6 py-2">{sum.lab}</td>
            </tr>
            <tr className="border-b border-slate-400">
              <th className="px-6 py-2">X-ray</th>
              <td className="px-6 py-2">{sum.xray}</td>
            </tr>
            <tr className="border-b border-slate-400">
              <th className="px-6 py-2">Ultrasound</th>
              <td className="px-6 py-2">{sum.ultrasound}</td>
            </tr>
            <tr className="border-b border-slate-400">
              <th className="px-6 py-2">Treatment</th>
              <td className="px-6 py-2">{sum.treatment}</td>
            </tr>
            <tr className="border-b border-slate-400">
              <th className="px-6 py-2">Ear Irrigation</th>
              <td className="px-6 py-2">{sum.earIrrigation}</td>
            </tr>
            <tr className="border-b border-slate-400">
              <th className="px-6 py-2">ECG</th>
              <td className="px-6 py-2">{sum.ecg}</td>
            </tr>
            <tr className="border-b border-slate-400">
              <th className="px-6 py-2">B.I.D</th>
              <td className="px-6 py-2">{sum.bid}</td>
            </tr>
            <tr className="border-b border-slate-400">
              <th className="px-6 py-2">Other</th>
              <td className="px-6 py-2">{sum.otherFee}</td>
            </tr>
            <tr className="border-b border-slate-400">
              <th className="px-6 py-2">Total</th>
              <td className="px-6 py-2 font-bold text-green-800">
                {(sum.otherFee || 0) +
                  (sum.ultrasound || 0) +
                  (sum.xray || 0) +
                  (sum.lab || 0) +
                  (sum.cardFee || 0) +
                  (sum.earIrrigation || 0) +
                  (sum.bid || 0) +
                  (sum.ecg || 0) +
                  (sum.treatment || 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
