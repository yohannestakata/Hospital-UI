function DoctorLabSelectSect({ register, section }) {
  return (
    <div key={section[0]}>
      <h2 className="font-bold">{section[0]}</h2>
      <div className="mt-3 grid grid-cols-4 gap-1">
        {section[1].map((test) => {
          return (
            <div class="inline-flex items-center font-primary" key={test._id}>
              <label
                class="relative flex cursor-pointer items-center rounded-full py-3"
                htmlFor={`${test._id}`}
              >
                <input
                  {...register("lab")}
                  id={`${test._id}`}
                  value={test._id}
                  type="checkbox"
                  class="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-4 w-4 cursor-pointer appearance-none rounded border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-green-800 checked:bg-green-800 checked:before:bg-green-800 hover:before:opacity-10"
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
