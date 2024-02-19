import { useSearchParams } from "react-router-dom";
import useGetAllResults from "./useGetAllResults";
import { FaClipboardList, FaPrint, FaWifi, FaXRay } from "react-icons/fa";
import { FaFlaskVial, FaPersonCircleQuestion } from "react-icons/fa6";
import PrintTemplate from "../../components/PrintTemplate";
import useGetPatient from "../../hooks/useGetPatient";

function convertDateTime(timestampString) {
  const dateTime = new Date(timestampString);
  const dateOptions = { month: "short", day: "numeric", year: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  const formattedDate = dateTime.toLocaleDateString(undefined, dateOptions);
  const formattedTime = dateTime.toLocaleTimeString(undefined, timeOptions);

  return `${formattedDate}, ${formattedTime}`;
}

function DoctorViewHistoryDetail() {
  const [searchParams] = useSearchParams();

  const patientId = searchParams.get("patientId");
  const date = searchParams.get("date");

  const { patient } = useGetPatient(patientId);

  const { data } = useGetAllResults({ date, patientId });

  const { examination, diagnosis, labResults, ultraResults, xrayResults } =
    data || {};
  const { ipcRenderer } = window.require("electron");

  const handlePrint = () => {
    ipcRenderer.send("print");
  };

  return (
    <PrintTemplate patient={patient}>
      <HistoryList
        handlePrint={handlePrint}
        examination={examination}
        labResults={labResults}
        ultraResults={ultraResults}
        xrayResults={xrayResults}
        diagnosis={diagnosis}
      />
    </PrintTemplate>
  );
}

export default DoctorViewHistoryDetail;

function HistoryList({
  examination,
  labResults,
  ultraResults,
  xrayResults,
  diagnosis,
  handlePrint,
}) {
  return (
    <>
      <div className="mt-3 flex items-end  justify-between  print:mt-0">
        <h1 className="text-2xl print:text-lg print:font-bold">
          Patient Diagnosis
        </h1>
        <button
          className="flex items-center gap-2 rounded-md border border-black/50 px-2 py-1 hover:bg-green-900 hover:text-green-200 print:invisible"
          onClick={handlePrint}
        >
          <FaPrint className="opacity-70" />
          Print
        </button>
      </div>
      <div className="mt-3 flex flex-col gap-3 print:mt-1">
        {examination && examination.length > 0
          ? examination?.map((exam) => {
              console.log(exam);
              return (
                <div className="rounded-md bg-white p-3 print:border">
                  <h2 className="flex items-center gap-2 text-xl font-bold print:text-lg">
                    <FaClipboardList className="opacity-70" />
                    <span>Examination</span>
                    <span className="ml-auto block text-base font-normal">
                      {convertDateTime(exam.date)}
                    </span>
                  </h2>
                  <div className="mt-4 flex flex-col gap-4">
                    <div>
                      <h3 className="text-lg font-bold">Chief Complaint</h3>
                      <pre className="mt-1 whitespace-break-spaces font-primary">
                        {exam.chiefComplaint || "None"}
                      </pre>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">History</h3>
                      <div className="mt-2 grid grid-cols-2 gap-3">
                        <div>
                          <h4 className="font-bold">Risk Factor</h4>
                          <pre className=" whitespace-break-spaces font-primary">
                            {exam.riskFactor || "None"}
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-bold">Allergy History</h4>
                          <pre className=" whitespace-break-spaces font-primary">
                            {exam.allergyHistory || "None"}
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-bold">
                            Underlying Chronic Illness
                          </h4>
                          <pre className=" whitespace-break-spaces font-primary">
                            {exam.underlyingChronicIllness || "None"}
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-bold">Past Surgical History</h4>
                          <pre className=" whitespace-break-spaces font-primary">
                            {exam.pastSurgicalHistory || "None"}
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-bold">Recent Admission</h4>
                          <pre className=" whitespace-break-spaces font-primary">
                            {exam.recentAdmission || "None"}
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-bold">
                            Personal/ Social/ Family History
                          </h4>
                          <pre className=" whitespace-break-spaces font-primary">
                            {exam.familyHistory || "None"}
                          </pre>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Physical Examination
                      </h3>
                      <div className="mt-2 grid grid-cols-2 gap-2 whitespace-break-spaces font-primary">
                        <div>
                          <h4 className="font-bold">Others</h4>
                          <p>{exam.others || "None"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">BP</h4>
                          <p>{exam.bp || "None"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">PR</h4>
                          <p>{exam.pr || "None"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">Temp</h4>
                          <p>{exam.temp || "None"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">Respi Rate</h4>
                          <p>{exam.respiRate || "None"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">HEENT</h4>
                          <p>{exam.heent || "None"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">G_App</h4>
                          <p>{exam.gApp || "None"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">CNS</h4>
                          <p>{exam.cns || "None"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">Chest</h4>
                          <p>{exam.chest || "None"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">Abdomen</h4>
                          <p>{exam.abdomen || "None"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">GUS</h4>
                          <p>{exam.gus || "None"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">Extremity</h4>
                          <p>{exam.extremity || "None"}</p>
                        </div>
                        <div>
                          <h4 className="font-bold">ENTGU_SYS</h4>
                          <p>{exam.entguSys || "None"}</p>
                        </div>
                      </div>
                      <div className="mt-3 ">
                        <h3 className="text-lg font-bold">Impression</h3>
                        <p className="mt-2">{exam.impression || "None"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
        {labResults && labResults?.length
          ? labResults?.map((result) => {
              return (
                <div className="rounded-md bg-white p-3 print:border">
                  <div>
                    <h3 className="flex items-center gap-2 text-xl font-bold print:text-lg">
                      <FaFlaskVial className="opacity-70" />
                      <span>Lab Results</span>
                      <span className="ml-auto text-base font-normal">
                        {convertDateTime(result.date)}
                      </span>
                    </h3>
                    <div>
                      {result.results.map((result) => {
                        return (
                          <div className="mt-4 rounded-md bg-white">
                            <h2 className="font-bold text-green-800">
                              {result.name}
                            </h2>
                            <table className="mt-2 w-full overflow-hidden rounded-md text-left text-sm">
                              <thead className="bg-green-800 text-green-50">
                                <th className="px-4 py-2">Params</th>
                                {result.parameterValues.map((params) => (
                                  <th className="px-4 py-2">{params}</th>
                                ))}
                              </thead>
                              <tbody>
                                {result.parameters.map((param, i) => {
                                  return (
                                    <tr className="border-b border-black/50 hover:bg-black/10">
                                      <td className="px-4 py-2">{param}</td>
                                      {result.values[i].map((val) => {
                                        return (
                                          <td className="px-4 py-2">{val}</td>
                                        );
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
                  </div>
                </div>
              );
            })
          : null}
        {ultraResults && ultraResults?.length
          ? ultraResults?.map((result) => {
              return (
                <div className="rounded-md bg-white p-3 print:border">
                  <h3 className="flex items-center gap-2 text-xl font-bold print:text-lg">
                    <FaWifi className="opacity-70" />
                    <span>Ultrasound Results</span>
                    <span className="ml-auto text-base font-normal">
                      {convertDateTime(result.date)}
                    </span>
                  </h3>
                  <div className="mt-4">
                    <h4 className=" font-bold">Order</h4>
                    <pre className=" whitespace-break-spaces font-primary">
                      {result.orderId.orderedTest}
                    </pre>
                  </div>
                  <div className="mt-3">
                    <h4 className=" font-bold">Findings</h4>
                    <pre className=" whitespace-break-spaces font-primary">
                      {result.findings}
                    </pre>
                  </div>
                  <div className="mt-3">
                    <h4 className="font-bold">Conclusion</h4>
                    <pre className=" whitespace-break-spaces font-primary">
                      {result.conclusion}
                    </pre>
                  </div>
                </div>
              );
            })
          : null}
        {xrayResults && xrayResults?.length
          ? xrayResults?.map((result) => {
              return (
                <div className="rounded-md bg-white p-3 print:border">
                  <h3 className="flex items-center gap-2 text-xl font-bold print:text-lg">
                    <FaXRay className="opacity-70" />
                    <span>Xray Results</span>
                    <span className="ml-auto text-base font-normal">
                      {convertDateTime(result.date)}
                    </span>
                  </h3>
                  <div className="mt-4">
                    <h4 className="font-bold">Order</h4>
                    <pre className="whitespace-break-spaces font-primary">
                      {result.orderId.orderedTest}
                    </pre>
                  </div>
                  <div className="mt-3">
                    <h4 className=" font-bold">Findings</h4>
                    <pre className="whitespace-break-spaces font-primary">
                      {result.findings}
                    </pre>
                  </div>
                  <div className="mt-3">
                    <h4 className="font-bold">Conclusion</h4>
                    <pre className=" whitespace-break-spaces font-primary">
                      {result.conclusion}
                    </pre>
                  </div>
                </div>
              );
            })
          : null}
        {diagnosis && diagnosis?.length
          ? diagnosis?.map((diag) => {
              return (
                <div className="rounded-md bg-white p-3 print:border">
                  <h2 className="flex items-center gap-2 text-xl font-bold print:text-lg">
                    <FaPersonCircleQuestion className="opacity-70" />
                    <span>Diagnosis</span>
                    <span className="ml-auto block text-base font-normal">
                      {convertDateTime(diag.date)}
                    </span>
                  </h2>
                  <div className="mt-4 flex flex-col gap-4">
                    <div>
                      <h3 className="font-bold ">Diagnosis</h3>
                      <pre className="whitespace-break-spaces font-primary">
                        {diag.diagnosis}
                      </pre>
                    </div>
                    <div>
                      <h3 className="font-bold ">Hospital Treatment</h3>
                      <pre className="whitespace-break-spaces font-primary">
                        {diag.hospitalTreatment}
                      </pre>
                    </div>
                    <div>
                      <h3 className="font-bold ">Prescription</h3>
                      <pre className="whitespace-break-spaces font-primary">
                        {diag.prescription}
                      </pre>
                    </div>
                    <div>
                      <h3 className="font-bold ">Progress Note</h3>
                      <pre className="whitespace-break-spaces font-primary">
                        {diag.progressNote}
                      </pre>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
