import { useSearchParams } from "react-router-dom";
import PrintTemplate from "../../components/PrintTemplate";
import useGetXrayResult from "./useGetXrayResult";
import { FaInfoCircle, FaPrint } from "react-icons/fa";
import useGetPatient from "../../hooks/useGetPatient";

function ShowXrayResults({ xrayId }) {
  const { xrayResult } = useGetXrayResult(xrayId);
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
      <div className="rounded-md bg-white p-3">
        <div className="pring:mt-4 flex  items-center justify-between text-2xl print:font-bold">
          <h1 className="print:text-lg">X-ray Results</h1>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-md border border-black/50 px-4 py-2 text-base hover:bg-green-800 hover:text-green-200 print:hidden"
          >
            <FaPrint />
            Print
          </button>
        </div>
        {xrayResult ? (
          <div className="mt-6">
            <h2 className="text-lg font-bold">Findings</h2>
            <pre className="mt-1 whitespace-break-spaces font-primary">
              {xrayResult?.findings}
            </pre>
            <h2 className="mt-3 text-lg font-bold">Conclusion</h2>
            <pre className="mt-1 whitespace-break-spaces font-primary">
              {xrayResult?.conclusion}
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

export default ShowXrayResults;
