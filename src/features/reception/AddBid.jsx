import { useForm } from "react-hook-form";
import AddUserInput from "../patient/AddUserInput";
import useAddBid from "./useAddBid";

function AddOldPatient() {
  const { mutate, isLoading } = useAddBid();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({ ...data, addToNurse: false });
    mutate({ ...data, addToNurse: false });
  };

  return (
    <div className="mx-2  rounded-md bg-white p-3">
      <h2 className="text-2xl">ክፍያ</h2>
      <form
        action=""
        className="mt-3 flex flex-col gap-2 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-2">
          <AddUserInput
            id="name"
            label="ስም"
            type="text"
            placeholder="Patient Name"
            register={register("name", { required: "Patient name required" })}
            error={errors.name}
          />
        </div>
        <div className="flex gap-2">
          <AddUserInput
            id="age"
            label="አድሜ"
            type="number"
            placeholder="Age"
            register={register("age", {
              required: "Patient age required",
              min: { value: 0, message: "Patient age must be positive" },
            })}
            error={errors.age}
          />
          <label htmlFor="sex" className="flex flex-1 flex-col gap-1">
            <span className="ml-1 text-sm font-bold">ጾታ</span>
            <select
              {...register("sex", { required: "Patient sex required" })}
              id="sex"
              name="sex"
              className="flex-1 rounded-md border border-gray-400 px-3 py-2 "
            >
              <option value="" disabled selected>
                Sex
              </option>
              <option value="male">ወንድ</option>
              <option value="female">ሴት</option>
            </select>
          </label>
        </div>
        <div className="flex gap-2">
          <AddUserInput
            id="phone"
            label="ስልክ ቁጥር"
            type="tel"
            placeholder="Phone number"
            register={register("phone", { required: "Patient phone required" })}
            error={errors.phone}
          />
          <AddUserInput
            id="addressZone"
            label="አድራሻ"
            type="text"
            placeholder="Address"
            register={register("addressZone", {
              required: false,
            })}
            error={errors.addressZone}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="room" className="flex flex-1 flex-col gap-1">
            <span className="ml-1  text-sm font-bold ">ምርመራ ክፍል</span>
            <select
              required
              name=""
              id="room"
              {...register("type")}
              className="rounded-md border border-black/50 p-2"
            >
              <option value="">Room</option>
              <option value="lab">Laboratory</option>
              <option value="ultrasound">Ultrasound</option>
              <option value="xray">X-ray</option>
              <option value="bid">BID</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label htmlFor="testType" className="flex flex-1 flex-col gap-1">
            <span className="ml-1 flex-1 text-sm font-bold ">ምርመራ ዓይነት</span>
            <input
              id="testType"
              type="text"
              {...register("testType")}
              className="rounded-md border border-black/50 p-2"
              placeholder="Test type"
            />
          </label>
        </div>
        <div className="flex gap-2">
          <AddUserInput
            id="bidFee"
            label="ክፍያ"
            type="number"
            placeholder="Fee"
            register={register("fee")}
          />
        </div>

        <div className="flex gap-2">
          <button
            disabled={isLoading}
            type="submit"
            className="flex-1 rounded-md  bg-green-800 py-2 text-green-50 disabled:bg-gray-400"
          >
            መዝግብ
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddOldPatient;
