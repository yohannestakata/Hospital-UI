import { useNavigate, useSearchParams } from "react-router-dom";
import useGetPatient from "../hooks/useGetPatient";
import useGetOrderedLabTests from "../features/lab/useGetOrderedLabTests";
import { useForm } from "react-hook-form";
import useAddLabResult from "../features/lab/useAddLabResult";

function transformData(data) {
  const result = {};

  Object.keys(data).forEach((key) => {
    const [category, parameter, property] = key.split("-");

    if (!result[category]) {
      result[category] = {
        params: [],
        results: [],
      };
    }

    if (!result[category].params.includes(property)) {
      result[category].params.push(property);
    }

    const existingResult = result[category].results.find(
      (item) => Object.keys(item)[0] === parameter,
    );

    if (existingResult) {
      existingResult[parameter].push(data[key]);
    } else {
      const newResult = {
        [parameter]: [data[key]],
      };
      result[category].results.push(newResult);
    }
  });

  return result;
}

function LabWriteTest() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const patientId = searchParams.get("patientId");
  const queueId = searchParams.get("queueId");
  const doctorName = searchParams.get("doctorName");
  const doctorId = searchParams.get("doctorId");
  const waitingId = searchParams.get("waitingId");

  const { register, handleSubmit } = useForm();

  const { patient } = useGetPatient(patientId);

  const { orderedTests } = useGetOrderedLabTests(orderId);

  const { mutate: addResult } = useAddLabResult();

  const navigate = useNavigate();

  function onSubmit(data) {
    const transformedData = transformData(data);

    addResult({
      labResults: transformedData,
      queueId,
      doctorId,
      patientId,
      orderId,
      waitingId,
    });

    console.log(transformData(data));
  }

  return (
    <div className="p-3">
      <button
        className="mb-2 rounded-md border border-black/50 px-2 text-sm"
        onClick={() => navigate("/lab-results")}
      >
        &lt; Back
      </button>
      <div className="">
        <div className="flex w-full flex-col gap-3 ">
          <div className="flex-1 rounded-md border border-black/50 bg-white p-3">
            <h2 className="text-lg font-bold">Patient Information</h2>
            <table className="mt-4 flex">
              <tbody className="flex gap-6">
                <tr>
                  <td>Name:</td>
                  <td className="px-2 font-amharic font-bold">
                    {patient?.name}
                  </td>
                </tr>
                <tr>
                  <td>Sex:</td>
                  <td className="px-2 font-bold">{patient?.gender}</td>
                </tr>
                <tr>
                  <td>Age:</td>
                  <td className="px-2 font-bold">{patient?.age}</td>
                </tr>
                <tr>
                  <td>OPD:</td>
                  <td className="px-2 font-bold">{doctorName}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <span className="mt-2 text-2xl">Orders</span>
          <form
            className="flex flex-col gap-2 "
            onSubmit={handleSubmit(onSubmit)}
          >
            {orderedTests?.orderedTests.map((test) => {
              return (
                <div className="rounded-md border border-black/50 bg-white p-3">
                  <span className="text-sm">{test.type}</span>
                  <h2 className="font-amharic text-lg font-bold text-green-800">
                    {test.name}
                  </h2>
                  <table className="mt-2 w-full overflow-hidden rounded-md text-left text-sm">
                    <thead>
                      <tr className="bg-green-800 text-green-50">
                        <th className="px-4 py-2">Test</th>
                        {test.parameterValues.map((vals) => (
                          <th className="px-4 py-2"> {vals}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {test.parameters.map((params) => (
                        <tr className="border-b " key={params._id}>
                          <td className="px-4 py-2">{params.name}</td>
                          {params.editable.map((_, i) => {
                            return (
                              <td>
                                <input
                                  {...register(
                                    `${test.name}-${params.name}-${test.parameterValues[i]}`,
                                  )}
                                  readOnly={!params.editable[i]}
                                  tabIndex={
                                    !params.editable[i] ? -1 : undefined
                                  }
                                  type="text"
                                  className="w-full rounded-md border-black/50  bg-black/10 px-2 py-1 read-only:opacity-60"
                                  defaultValue={params.defaultValues[i]}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
            <button className="rounded-md bg-green-800 py-2 text-green-50 hover:bg-green-900 hover:text-green-200">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LabWriteTest;
