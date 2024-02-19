import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";
import { usePatient } from "../../context/PatientContext";
import { useSearchParams } from "react-router-dom";
import useGetTests from "./useGetTests";
import DoctorLabSelectSect from "./DoctorLabSelectSect";

import useAddOrder from "./useAddOrder";
import FancyCheckbox from "../../components/FancyCheckbox";
import ComplaintCheckBox from "./ComplaintCheckBox";

function DoctorOrderLab() {
  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: { lab: [], ultrasound: "", xray: "" },
  });
  const { isLoading, data } = useGetTests();
  const { userId } = useUser();
  const { patient } = usePatient();
  const { mutate: addOrder, isLoading: loadingAddLab } = useAddOrder();

  const [searchParams] = useSearchParams();
  const vitalsId = searchParams.get("vitals");
  const waitingId = searchParams.get("waitingId");

  function groupByType(data) {
    return data?.reduce((result, current) => {
      const type = current.type;

      if (!result[type]) {
        result[type] = [];
      }

      result[type].push(current);

      return result;
    }, {});
  }

  const groupedTests = groupByType(data?.data.tests);

  function onSubmitLab(data) {
    addOrder({
      ...data,
      patientId: patient._id,
      doctorId: userId,
      vitalsId,
      waitingId,
    });

    // console.log({
    //   ...data,
    //   patientId: patient._id,
    //   doctorId: userId,
    //   vitalsId,
    //   waitingId,
    // });
  }

  const handleCheckboxChangeUltra = (value, isChecked) => {
    if (isChecked) {
      setValue(
        "ultrasound",
        (() => {
          const prevComplaints = getValues("ultrasound")
            .split(", ")
            .filter((val) => val.trim() !== "");
          prevComplaints.push(value);
          return prevComplaints.join(", ");
        })(),
      );
    } else {
      setValue(
        "ultrasound",
        (() => {
          const prevComplaints = getValues("ultrasound")
            .split(", ")
            .filter((val) => val.trim() !== "");
          const newComplaints = prevComplaints.filter((val) => val !== value);
          return newComplaints.join(", ");
        })(),
      );
    }
  };

  const handleCheckboxChangeXray = (value, isChecked) => {
    if (isChecked) {
      setValue(
        "xray",
        (() => {
          const prevComplaints = getValues("xray")
            .split(", ")
            .filter((val) => val.trim() !== "");
          prevComplaints.push(value);
          return prevComplaints.join(", ");
        })(),
      );
    } else {
      setValue(
        "xray",
        (() => {
          const prevComplaints = getValues("xray")
            .split(", ")
            .filter((val) => val.trim() !== "");
          const newComplaints = prevComplaints.filter((val) => val !== value);
          return newComplaints.join(", ");
        })(),
      );
    }
  };

  return (
    <div className="pb-1">
      <form
        action=""
        onSubmit={handleSubmit(onSubmitLab)}
        className=" flex flex-col gap-3"
      >
        <div className="flex flex-col gap-4 rounded-md border border-gray-300 bg-white p-4 ">
          <h1 className="text-2xl">Labratory</h1>
          {isLoading ||
            Object.entries(groupedTests).map((section) => {
              return (
                <DoctorLabSelectSect
                  key={section[0]}
                  register={register}
                  section={section}
                />
              );
            })}
        </div>
        <div className="flex flex-col gap-4 rounded-md border border-gray-300 bg-white p-4">
          <h1 className="text-2xl">Ultrasound</h1>
          <textarea
            {...register("ultrasound")}
            className="w-full rounded-md border-2 border-black/50  px-3 py-2"
            placeholder="Input order"
            onChange={(e) => setValue("ultrasound", e.target.value)}
            id=""
            rows="2"
          />
          <form action="" className=" grid grid-cols-4">
            <ComplaintCheckBox
              complaint={"Abdomen"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"Abdomen and Pelvic"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"BPP"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"Brain"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"Breast"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"Cartoid Doppler (Neck)"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"Cartoid Duplex"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"Doppler of lower extremity arteries and veins"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />{" "}
            <ComplaintCheckBox
              complaint={"Mammography"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"Obsteric"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"Obsteric (Twins)"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"Pelvic"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"Scrotum"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"Thyroid"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
            <ComplaintCheckBox
              complaint={"Wrist"}
              type="ultrasound"
              handleCheckboxChange={handleCheckboxChangeUltra}
            />
          </form>
        </div>
        <div className="flex flex-col gap-4 rounded-md border border-gray-300 bg-white p-4">
          <h1 className="text-2xl">X-ray</h1>
          <textarea
            {...register("xray")}
            onChange={(e) => setValue("xray", e.target.value)}
            className="w-full rounded-md border-2 border-black/50  px-3 py-2"
            placeholder="Input order"
            name=""
            id=""
            rows="2"
          />
          <form action="" className=" grid grid-cols-4">
            <ComplaintCheckBox
              complaint={"Barium Swallow"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Cervical"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Chest"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Distal Tibo Fibula and Ankle"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Femur"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Foot"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Forearm"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Hand"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Knee"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"KUB"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Lumbar Spine"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Pelvic"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Shoulder"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Skull"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
            <ComplaintCheckBox
              complaint={"Thoracolumbar"}
              handleCheckboxChange={handleCheckboxChangeXray}
            />
          </form>
        </div>
        <div className="gap flex flex-col justify-around rounded-md border border-gray-300 bg-white p-4">
          <FancyCheckbox
            label="Ear Irrigation"
            register={register}
            value={"earIrrigation"}
          />
          <FancyCheckbox label="ECG" register={register} value={"ecg"} />
        </div>
        <div className="flex gap-2 px-1">
          <button
            type="reset"
            onClick={() => {
              reset();
            }}
            className="inline-block flex-1 rounded-md  px-5 py-2 ring-1  ring-gray-400 "
          >
            Clear
          </button>
          <button
            className="flex-1 rounded-md bg-green-800 px-5 py-2 text-green-50 hover:bg-green-900 hover:text-green-200 disabled:bg-slate-400"
            disabled={loadingAddLab}
          >
            Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default DoctorOrderLab;
