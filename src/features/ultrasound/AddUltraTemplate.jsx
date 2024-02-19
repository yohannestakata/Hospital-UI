import { useForm } from "react-hook-form";
import useAddTemplate from "./useAddTemplate";

function AddUltraTemplate() {
  const { register, handleSubmit } = useForm();
  const { addTemplate } = useAddTemplate();

  function onSubmit(data) {
    addTemplate({ ...data, type: "ultrasound" });
  }

  return (
    <div className="mx-2 rounded-md bg-white p-3">
      <h1 className="text-2xl">Add Ultrasound Template</h1>
      <div className="mt-6">
        <form
          action=""
          className="flex w-full flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="title" className="flex flex-col  gap-1">
            <span className="ml-1 text-sm font-bold">Title</span>
            <input
              {...register("title", { required: true })}
              type="text"
              className="rounded-md border border-black/50 px-4 py-2"
              placeholder="Insert title"
              id="title"
            />
          </label>
          <label htmlFor="title" className="flex flex-col  gap-1">
            <span className="ml-1 text-sm font-bold">Findings</span>
            <textarea
              {...register("content", { required: true })}
              rows="4"
              type="text"
              className="rounded-md border border-black/50 px-4 py-2"
              placeholder="Insert findings template"
              id="title"
            />
          </label>
          <div>
            <button className="ml-auto block w-full rounded-md bg-green-800 px-4 py-2 text-green-50 hover:bg-green-900 hover:text-green-200">
              Insert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUltraTemplate;
