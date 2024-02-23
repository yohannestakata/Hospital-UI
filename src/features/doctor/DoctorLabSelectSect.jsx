import { useState } from "react";

function DoctorLabSelectSect({
  section,
  addToSet,
  removeFromSet,
  mySet,
  addArrayToSet,
  removeArrayFromSet,
}) {
  const [titleChecked, setTitleChecked] = useState(true);

  return (
    <div key={section[0]}>
      <label
        className="flex cursor-pointer items-center gap-2"
        onClick={(e) => {
          e.preventDefault();
          const testIds = section[1].map((test) => test._id);

          if (titleChecked) addArrayToSet(testIds);
          else removeArrayFromSet(testIds);

          setTitleChecked((prev) => !prev);
        }}
        htmlFor={`title${section[0]}`}
      >
        <input
          id={`title${section[0]}`}
          checked={Array.from(section[1].map((test) => test._id)).every(
            (value) => mySet.has(value),
          )}
          type="checkbox"
          name=""
          className="before:content[''] checked:border-black-green-800 peer relative h-4 w-4 cursor-pointer appearance-none rounded border border-black transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:bg-yellow-800 checked:before:bg-green-800 hover:before:opacity-10"
        />
        <h2 className="font-bold">{section[0]}</h2>
      </label>
      <div className="mt-3 grid grid-flow-col grid-cols-4 grid-rows-4 gap-1">
        {section[1].map((test) => {
          // console.log(section);
          return (
            <div
              class="inline-flex items-center font-primary"
              key={test._id}
              onClick={(e) => {
                e.preventDefault();
                if (mySet.has(test._id)) removeFromSet(test._id);
                else addToSet(test._id);
              }}
            >
              <label
                class="relative flex cursor-pointer items-center rounded-full py-3"
                htmlFor={`${test._id}`}
              >
                <input
                  id={`${test._id}`}
                  value={test._id}
                  type="checkbox"
                  checked={mySet.has(test._id)}
                  class="before:content[''] checked: border-black-green-800 peer relative h-4 w-4 cursor-pointer appearance-none rounded border border-black transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:bg-green-800 checked:before:bg-green-800 hover:before:opacity-10"
                />
                <span class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <label
                class="ml-3 mt-px cursor-pointer select-none"
                htmlFor={`${test._id}`}
              >
                {test.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DoctorLabSelectSect;
