import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

function AddTests() {
  const [test, setTest] = useState({
    name: "",
    type: "",
    parameters: [
      {
        name: "",
        editable: [],
        defaultValues: [],
      },
    ],
    parameterValues: ["Result", "Normal Value"],
  });

  const paramValuesLength = test.parameterValues.length;

  console.log(test, paramValuesLength);

  function handleNameChange(e) {
    e.preventDefault();
    setTest((prev) => {
      return { ...prev, name: e.target.value };
    });
  }

  function handleTypeChange(e) {
    e.preventDefault();
    setTest((prev) => {
      return { ...prev, type: e.target.value };
    });
  }

  function handleParameterValues(e) {
    e.preventDefault();
    setTest((prev) => {
      return { ...prev, parameterValues: e.target.value.split(", ") };
    });
  }

  return (
    <div className="rounded-md bg-white p-3">
      <h1 className="text-2xl">Add Laboratory Tests</h1>

      <form action="" className="mt-4 flex flex-col gap-3">
        <div className="flex gap-2">
          <label htmlFor="test-name" className="flex flex-col gap-1">
            <span className=" ml-1 text-sm font-bold">Test name</span>
            <input
              onChange={handleNameChange}
              value={test.name}
              type="text"
              placeholder="eg. CBC"
              id="test-type"
              className="rounded-md border border-black/50 px-2 py-1"
            />
          </label>
          <label htmlFor="test-type" className="flex flex-col gap-1">
            <span className=" ml-1 text-sm font-bold">Test type</span>
            <input
              value={test.type}
              onChange={handleTypeChange}
              type="text"
              placeholder="eg. Hematology"
              id="test-type"
              className="rounded-md border border-black/50 px-2 py-1"
            />
          </label>
        </div>
        <div className="flex gap-2">
          <label
            htmlFor=""
            id="parameter-values"
            className="flex flex-col gap-1"
          >
            <div className="flex items-center gap-3 text-sm font-bold">
              <span className="ml-1 ">Parameter values</span>
              <span className="flex items-center gap-1  text-green-800">
                <FaInfoCircle /> Insert values separated by a comma and space.
              </span>
            </div>
            <input
              type="text"
              name=""
              id="parameter-values"
              className="rounded-md border border-black/50 px-2 py-1"
              placeholder="eg: col1, col2, col3"
              onChange={handleParameterValues}
              value={test.parameterValues.join(", ")}
            />
          </label>
        </div>
      </form>
      <div className="mt-4 rounded-md border border-green-800 bg-green-50 p-3">
        <h2 className="text-sm">Preview</h2>
        <h3 className="mt-3 font-bold text-green-800">
          {test.name} - {test.type}
        </h3>
        <table className="mt-2 w-full overflow-hidden rounded-md">
          <thead>
            <tr className="bg-green-800 text-green-50">
              {test.parameterValues.map((head) => {
                return <th className="px-2 py-1">{head}</th>;
              })}
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default AddTests;
