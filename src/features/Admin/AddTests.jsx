import { useEffect, useState } from "react";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
import useAddTest from "./useAddTest";

const initialParameter = {
  name: "",
  editable: [true, true],
  defaultValues: ["", ""],
};

const initialTest = {
  name: "",
  type: "",
  parameters: [initialParameter],
  parameterValues: ["Result", "Normal Value"],
};

function AddTests() {
  const [test, setTest] = useState(initialTest);
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

  const addParameter = () => {
    const newParameter = {
      name: test.name,
      editable: Array(test.parameterValues.length).fill(true),
      defaultValues: Array(test.parameterValues.length).fill(""),
    };

    setTest((prev) => ({
      ...prev,
      parameters: [...prev.parameters, newParameter],
    }));
  };

  useEffect(() => {
    const updatedParameters = test.parameters.map((param) => ({
      ...param,
      name: test.name,
      editable: Array(test.parameterValues.length).fill(true),
      defaultValues: Array(test.parameterValues.length).fill(""),
    }));

    setTest((prev) => ({
      ...prev,
      parameters: updatedParameters,
    }));
  }, [test.name, test.parameterValues.length]);

  const { addTest } = useAddTest();

  function handleSubmit() {
    addTest(test);
  }

  return (
    <div className="rounded-md bg-white p-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Add Laboratory Tests</h1>
        <button
          className="rounded-md bg-green-800 px-4 py-2 text-green-50  hover:bg-green-900 hover:text-green-200"
          onClick={handleSubmit}
        >
          Add Test
        </button>
      </div>

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
        <table className="mt-2 w-full overflow-hidden rounded-md text-left">
          <thead>
            <tr className="bg-green-800 text-green-50">
              <th className="px-2 py-1">Params</th>
              {test.parameterValues.map((head) => {
                return <th className="px-2 py-1">{head}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {test.parameters.map((param, i) => {
              return (
                <tr>
                  <td className="py-1">
                    <input
                      required
                      className="rounded-md border border-black/50  px-2 py-1"
                      placeholder="Param name"
                      value={param.name}
                      onChange={(e) => {
                        e.preventDefault();
                        setTest((prev) => {
                          const updatedParameters = [...prev.parameters];
                          updatedParameters[i] = {
                            ...updatedParameters[i],
                            name: e.target.value,
                          };
                          return { ...prev, parameters: updatedParameters };
                        });
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          type="button"
          onClick={addParameter}
          className="mt-2 flex items-center gap-2 rounded-md bg-green-800 px-2 py-1 text-sm text-green-50"
        >
          <FaPlus />
          Add Param
        </button>
      </div>
    </div>
  );
}

export default AddTests;
