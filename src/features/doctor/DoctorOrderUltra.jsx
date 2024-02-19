import { useForm } from "react-hook-form";
import useAddUltraOrder from "./useAddUltraOrder";

function DoctorOrderUltra({
  loadingAddLab,
  doctorId,
  patientId,
  labResultId,
  ultrasoundResultId,
  vitalsResultId,
  xrayResultId,
}) {
  const { register, handleSubmit } = useForm();

  const { mutate: addUltraOrder } = useAddUltraOrder();

  function onSubmit(data) {
    addUltraOrder({
      doctorId,
      patientId,
      labResultId,
      ultrasoundResultId,
      vitalsResultId,
      xrayResultId,
      order: data.order,
    });
  }

  return (
    <div className="bg-white border border-gray-300 rounded-md mt-3 p-3">
      <h2 className="text-2xl ">Order Ultrasound</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("order")}
          type="text"
          className="border w-full mt-2 focus:outline-blue-800 bg-gray-100 px-3 py-1 rounded-md"
          placeholder="Order summary"
        />
        <div className="flex gap-2 justify-end mt-2">
          <button
            type="reset"
            className="ring-1 ring-gray-400 rounded-md  px-4 py-1  inline-block ">
            Clear
          </button>
          <button
            className="bg-gradient-to-b rounded-md text-blue-50 px-4 py-1 from-blue-600 to-blue-800 inline-block ring-1 ring-blue-800 hover:ring-offset-2 duration-100 disabled:from-gray-300 disabled:to-gray-400"
            disabled={loadingAddLab}>
            Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default DoctorOrderUltra;
