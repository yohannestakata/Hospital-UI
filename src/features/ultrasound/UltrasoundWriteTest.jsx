import { useSearchParams } from "react-router-dom";
import useGetUltraOrder from "./useGetUltraOrder";
import useGetPatient from "../../hooks/useGetPatient";
import { useEffect, useState } from "react";
import useAddUltraResult from "./useAddUltraResult";
import useGetUltraTemplates from "./useGetTemplates";
import { FaCheck, FaPrint } from "react-icons/fa";
import PrintTemplate from "../../components/PrintTemplate";
import useRemoveExternalWaitlist from "../../hooks/useRemoveExternalWaitlist";

function formatDate(date) {
  return new Date(date).toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function UltrasoundWriteTest() {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patientId");
  const doctorName = searchParams.get("doctorName");
  const doctorId = searchParams.get("doctorId");
  const queueId = searchParams.get("queueId");
  const orderId = searchParams.get("orderId");
  const waitingId = searchParams.get("waitingId");
  const isExternal = searchParams.get("isExternal");

  const { deleteWaitlist } = useRemoveExternalWaitlist({
    orderId: waitingId,
    orderList: "ultrasound",
    goto: "/ultrasound/waitinglist",
  });

  function handleFinish(e) {
    e.preventDefault();
    deleteWaitlist();
  }

  const { patient } = useGetPatient(patientId);
  const { order } = useGetUltraOrder(orderId);
  const [findingsText, setFindingsText] = useState("");
  const [conclusionText, setConclusionText] = useState("");

  const { mutate: addResult } = useAddUltraResult();
  const { templates } = useGetUltraTemplates();

  const [findingsTextAreaHeight, setFindingsTextAreaHeight] = useState({});
  const [conclusionTextAreaHeight, setConclusionTextAreaHeight] = useState({});

  useEffect(() => {
    const updatedFindingsTextAreaHeight = {};
    Object.keys(findingsText).forEach((key) => {
      const textarea = document.getElementById(key);
      if (textarea) {
        updatedFindingsTextAreaHeight[key] = textarea.scrollHeight;
      }
    });
    setFindingsTextAreaHeight(updatedFindingsTextAreaHeight);

    const updatedConclusionTextAreaHeight = {};
    Object.keys(conclusionText).forEach((key) => {
      const textarea = document.getElementById(key);
      if (textarea) {
        updatedConclusionTextAreaHeight[key] = textarea.scrollHeight;
      }
    });
    setConclusionTextAreaHeight(updatedConclusionTextAreaHeight);
  }, [findingsText, conclusionText]);

  function handleSubmit(e) {
    e.preventDefault();

    let formattedFindings = "";

    for (const [key, value] of Object.entries(findingsText)) {
      formattedFindings += key + "\n";
      formattedFindings += value + "\n\n";
    }

    let formattedConclusion = "";

    for (const [key, value] of Object.entries(conclusionText)) {
      formattedConclusion += key + "\n";
      formattedConclusion += value + "\n\n";
    }

    addResult({
      queueId,
      orderId,
      doctorId,
      patientId,
      waitingId,
      type: "Ultrasound",
      findings: formattedFindings,
      conclusion: formattedConclusion,
    });
  }

  const { ipcRenderer } = window.require("electron");

  const handlePrint = () => {
    ipcRenderer.send("print");
  };

  return (
    <div className="px-2">
      <div className="rounded-md bg-white p-3">
        <div className="">
          <h2 className="text-lg">Patient Details</h2>
          <table className="mt-2">
            <tbody className="flex gap-6">
              <tr>
                <td>Name:</td>
                <td className="px-2 ">
                  <span className="font-amharic font-bold">
                    {!isExternal ? patient?.name : order?.bid.name}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Age:</td>
                <td className="px-2 ">
                  <span className="font-bold">
                    {!isExternal ? patient?.age : order?.bid.age}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Sex:</td>
                <td className="px-2 ">
                  <span className="font-bold">
                    {!isExternal ? patient?.gender : order?.bid.sex}
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
                  <span className="font-bold">{formatDate(order?.date)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="my-5 rounded-md border border-black/50 p-4">
          <h2 className="font-bold">Ultrasound Order</h2>
          <p className="mt-2 ">
            {!isExternal ? order?.orderedTest : order?.externalOrder}
          </p>
        </div>

        <div className="">
          <h2 className="text-lg">Report</h2>
          <PrintTemplate
            patient={
              !isExternal
                ? patient
                : {
                    name: order?.bid.name,
                    age: order?.bid.age,
                    sez: order?.bid.sex,
                  }
            }
          >
            <form
              action=""
              className="mt-3 flex flex-col gap-2"
              onSubmit={handleSubmit}
            >
              {!isExternal &&
                order?.orderedTest.split(", ").map((test) => {
                  return (
                    <>
                      <label
                        htmlFor={`${test} findings`}
                        className="mt-3 flex flex-col gap-1"
                        key={test}
                      >
                        <div className="flex items-end justify-between">
                          <span className="ml-1 text-sm font-bold">
                            {test} Findings
                          </span>
                          <select
                            name=""
                            id=""
                            className="rounded-md border border-black/50 px-3 py-1 print:hidden "
                            onChange={(e) => {
                              setFindingsText((prev) => {
                                return {
                                  ...prev,
                                  [`${test} findings`]: e.target.value,
                                };
                              });
                            }}
                          >
                            <option value="">Load template</option>
                            {templates
                              ?.filter((temp) => temp.type === "ultrasound")
                              .toSorted((a, b) =>
                                a.title.localeCompare(b.title),
                              )
                              .map((temp) => {
                                return (
                                  <option key={temp._id} value={temp.content}>
                                    {temp.title}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <textarea
                          value={findingsText[`${test} findings`]}
                          onChange={(e) => {
                            setFindingsText((prev) => {
                              return {
                                ...prev,
                                [`${test} findings`]: e.target.value,
                              };
                            });
                          }}
                          style={{
                            height: `${findingsTextAreaHeight[`${test} findings`] || 100}px`,
                          }}
                          name=""
                          id={`${test} findings`}
                          cols="30"
                          rows="6"
                          placeholder={`${test} findings`}
                          className="w-full rounded-md border border-black/50 px-3 py-1 "
                        ></textarea>
                      </label>
                      <label
                        htmlFor={`${test} conclusion`}
                        className="flex flex-col gap-1"
                      >
                        <span className="ml-1 text-sm font-bold">
                          {test} Conclusion
                        </span>
                        <textarea
                          value={conclusionText[`${test} conclusion`]}
                          onChange={(e) =>
                            setConclusionText((prev) => {
                              return {
                                ...prev,
                                [`${test} conclusion`]: e.target.value,
                              };
                            })
                          }
                          style={{
                            height: `${conclusionTextAreaHeight[`${test} conclusion`] || 100}px`,
                          }}
                          name=""
                          id={`${test} conclusion`}
                          cols="30"
                          rows="3"
                          placeholder={`${test} Conclusion`}
                          className="w-full rounded-md  border border-black/50 px-3 py-1 "
                        ></textarea>
                      </label>
                    </>
                  );
                })}
              {isExternal && (
                <div>
                  <label
                    htmlFor={`findings`}
                    className="mt-3 flex flex-col gap-1"
                  >
                    <div className="flex items-end justify-between">
                      <span className="ml-1 text-sm font-bold">Findings</span>
                      <select
                        name=""
                        id=""
                        className="rounded-md border border-black/50 px-3 py-1 print:hidden "
                        onChange={(e) => {
                          setFindingsText((prev) => {
                            return {
                              ...prev,
                              [`findings`]: e.target.value,
                            };
                          });
                        }}
                      >
                        <option value="">Load template</option>
                        {templates
                          ?.filter((temp) => temp.type === "ultrasound")
                          .toSorted((a, b) => a.title.localeCompare(b.title))
                          .map((temp) => {
                            return (
                              <option key={temp._id} value={temp.content}>
                                {temp.title}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <textarea
                      value={findingsText[`findings`]}
                      onChange={(e) => {
                        setFindingsText((prev) => {
                          return {
                            ...prev,
                            [`findings`]: e.target.value,
                          };
                        });
                      }}
                      style={{
                        height: `${findingsTextAreaHeight[`findings`] || 100}px`,
                      }}
                      name=""
                      id={`findings`}
                      cols="30"
                      rows="6"
                      placeholder={`findings`}
                      className="w-full rounded-md border border-black/50 px-3 py-1 "
                    ></textarea>
                  </label>
                  <label
                    htmlFor={`conclusion`}
                    className="mt-3 flex flex-col gap-1"
                  >
                    <span className="ml-1 text-sm font-bold">Conclusion</span>
                    <textarea
                      value={conclusionText[`conclusion`]}
                      onChange={(e) =>
                        setConclusionText((prev) => {
                          return {
                            ...prev,
                            [`conclusion`]: e.target.value,
                          };
                        })
                      }
                      style={{
                        height: `${conclusionTextAreaHeight[`conclusion`] || 100}px`,
                      }}
                      name=""
                      id={`conclusion`}
                      cols="30"
                      rows="3"
                      placeholder={`Conclusion`}
                      className="w-full rounded-md  border border-black/50 px-3 py-1 "
                    ></textarea>
                  </label>
                </div>
              )}
              <div className="ml-auto mt-2 flex  gap-2 print:hidden">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handlePrint();
                  }}
                  type="button"
                  className="flex items-center gap-2 rounded-md border border-black/50 px-4 py-2 duration-100 hover:bg-green-900 hover:text-green-200"
                >
                  <FaPrint />
                  Print
                </button>
                {!isExternal && (
                  <button
                    type="submit"
                    className="block rounded-md bg-green-800 px-4 py-2 text-green-50 duration-100 hover:bg-green-900 hover:text-green-200"
                  >
                    Submit
                  </button>
                )}

                {isExternal && (
                  <button
                    onClick={handleFinish}
                    className="flex items-center gap-2 rounded-md bg-green-800 px-4 py-2 text-green-50 duration-100 hover:bg-green-900 hover:text-green-200"
                  >
                    <FaCheck />
                    Finish
                  </button>
                )}
              </div>
            </form>
          </PrintTemplate>
        </div>
      </div>
    </div>
  );
}

export default UltrasoundWriteTest;
