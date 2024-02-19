import { useSearchParams } from "react-router-dom";
import PrintTemplate from "../../components/PrintTemplate";
import useGetPatient from "../../hooks/useGetPatient";
import useGetLabResult from "./useGetLabResult";
import { FaPrint } from "react-icons/fa";

function ShowLabResults({ labId }) {
  const { labResult } = useGetLabResult(labId);
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patientId");
  const { patient } = useGetPatient(patientId);

  const { ipcRenderer } = window.require("electron");

  const handlePrint = (e) => {
    e.preventDefault();
    ipcRenderer.send("print");
  };

  return (
    <PrintTemplate patient={patient}>
      <div className="mt-4 flex  items-center justify-between text-2xl print:font-bold">
        <h1 className="print:text-lg">Laboratory Results</h1>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-md border border-black/50 px-4 py-2 text-base hover:bg-green-800 hover:text-green-200 print:hidden"
        >
          <FaPrint />
          Print
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-2 ">
        {labResult?.results.map((result) => {
          return (
            <div className="rounded-md bg-white p-4 print:border print:border-black/50">
              <h2 className="font-bold text-green-800">{result.name}</h2>
              <table className="mt-2 w-full  overflow-hidden rounded-md border-black/50 text-left text-sm print:border-collapse print:border">
                <thead className="bg-green-800 text-green-50">
                  <th className="px-4 py-2">Params</th>
                  {result.parameterValues.map((params) => (
                    <th className="px-4 py-2">{params}</th>
                  ))}
                </thead>
                <tbody>
                  {result.parameters.map((param, i) => {
                    return (
                      <tr className="border-b border-black/50 hover:bg-black/10 print:border-b">
                        <td className="px-4 py-2">{param}</td>
                        {result.values[i].map((val) => {
                          return <td className="px-4 py-2">{val}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </PrintTemplate>
  );
}

export default ShowLabResults;
