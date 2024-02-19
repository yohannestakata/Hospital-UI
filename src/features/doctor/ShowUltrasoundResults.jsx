import { FaInfoCircle, FaPrint } from "react-icons/fa";
import useGetUltraResult from "./useGetUltraResult";
import { useSearchParams } from "react-router-dom";
import useGetPatient from "../../hooks/useGetPatient";
import PrintTemplate from "../../components/PrintTemplate";

function ShowUltrasoundResults({ ultraId }) {
  const { ultraResult } = useGetUltraResult(ultraId);

  console.log(ultraId);

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
      <div className=" rounded-md bg-white p-3">
        <div className="flex items-center  justify-between text-2xl print:mt-4 print:font-bold">
          <h1 className="print:text-lg">Ultrasound Results</h1>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-md border border-black/50 px-4 py-2 text-base hover:bg-green-800 hover:text-green-200 print:hidden"
          >
            <FaPrint />
            Print
          </button>
        </div>
        {ultraResult ? (
          <div className="mt-6">
            <h2 className="text-lg font-bold">Findings</h2>
            <pre className="mt-1 whitespace-break-spaces font-primary ">
              {ultraResult?.findings}
            </pre>
            <h2 className="mt-3 text-lg font-bold">Conclusion</h2>
            <pre className="mt-1 whitespace-break-spaces font-primary">
              {ultraResult?.conclusion}
            </pre>
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-3 font-bold">
            <FaInfoCircle className=" text-black/60" />
            <span> No results</span>
          </div>
        )}
      </div>
    </PrintTemplate>
  );
}

export default ShowUltrasoundResults;
