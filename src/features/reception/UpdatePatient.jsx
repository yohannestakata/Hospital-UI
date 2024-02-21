import { useForm } from "react-hook-form";
import { useGetDoctors } from "../../hooks/useGetDoctors";
import AddUserInput from "../patient/AddUserInput";
import { useParams } from "react-router-dom";
import useGetPatient from "../../hooks/useGetPatient";
import useUpdatePatient from "./useUpdatePatient";

function UpdatePatient() {
  const { isLoading: doctorsLoading, doctors } = useGetDoctors();
  const { patientId } = useParams();

  const { patient } = useGetPatient(patientId);
  const { updatePatient, isLoading } = useUpdatePatient();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardNum: patient?.cardNumber,
      name: patient?.name,
      age: patient?.age,
      sex: patient?.gender,
      phone: patient?.phone,
      addressZone: patient?.addressZone,
      opd: patient?.opd,
    },
  });

  const onSubmit = (data) => {
    updatePatient({
      ...data,
      cardNumber: data.cardNum,
      gender: data.sex,
      _id: patientId,
    });
    // updatePatient(data);
  };
  if (!patient) {
    return <div>Loading...</div>; // or another loading indicator
  }
  return (
    <div className="mx-2  rounded-md bg-white p-3">
      <h2 className="text-2xl">Edit Existing Patient</h2>
      <form
        action=""
        className="mt-3 flex flex-col gap-2 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-2">
          <AddUserInput
            id="cardNum"
            label="ካርድ ቁጥር"
            type="text"
            placeholder="Card Number"
            register={register("cardNum", { required: "Card number required" })}
            error={errors.cardNum}
          />

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
          {/* <div className="flex gap-2">
        <AddUserInput
          id="wereda"
          label="ወረዳ"
          type="text"
          placeholder="Wereda"
          register={register("wereda", { required: false })}
          error={errors.wereda}
        />
        <AddUserInput
          id="houseNum"
          label="የቤት ቁጥር"
          type="text"
          placeholder="House Number"
          register={register("houseNumber", {
            required: false,
          })}
          error={errors.houseNumber}
        />
      </div> */}
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
        {/* <AddUserInput
        id="alerfy"
        label="አለርጂ"
        type="text"
        placeholder="Alergy"
        register={register("alergy", {
          required: false,
        })}
        error={errors.alergy}
      /> */}
        <label
          htmlFor="opd"
          className="flex flex-1 flex-col gap-1"
          disabled={doctorsLoading}
        >
          <span className="ml-1 text-sm font-bold">ሃኪም</span>
          <select
            {...register("opd", { required: "Patient OPD required" })}
            id="opd"
            name="opd"
            className="rounded-md border border-gray-400 px-3 py-2 "
          >
            <option disabled selected value={""}>
              OPD
            </option>
            {doctors?.map((doctor) => {
              return (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              );
            })}
          </select>
        </label>

        <div className="flex gap-2">
          <button
            type="clear"
            className="flex-1 rounded-md border border-gray-400 py-2"
          >
            አጥፋ
          </button>
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

export default UpdatePatient;
