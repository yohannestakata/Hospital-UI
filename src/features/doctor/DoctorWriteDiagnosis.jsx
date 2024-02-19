import { useEffect, useState } from "react";
import { usePatient } from "../../context/PatientContext";
import { useUser } from "../../context/UserContext";
import useAddDiagnosis from "./useAddDiagnosis";
import ComplaintCheckBox from "./ComplaintCheckBox";
import useGetLatestDiagnosis from "./useGetLastestDiagnosis";
import useGetTodaysDiagnosis from "./useGetTodaysDiagnosis";

function DoctorWriteDiagnosis() {
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [history, setHistory] = useState({});
  const [physicalExamination, setPhysicalExamination] = useState({});
  const { patient } = usePatient();

  const handleCheckboxChange = (value, isChecked) => {
    if (isChecked) {
      setChiefComplaint((prev) => {
        const prevComplaints = prev
          .split(", ")
          .filter((val) => val.trim() !== "");
        prevComplaints.push(value);
        return prevComplaints.join(", ");
      });
    } else {
      setChiefComplaint((prev) => {
        const prevComplaints = prev
          .split(", ")
          .filter((val) => val.trim() !== "");
        const newComplaints = prevComplaints.filter((val) => val !== value);
        return newComplaints.join(", ");
      });
    }
  };

  const { userId: doctorId } = useUser();
  const patientId = patient._id;

  const { addDiagnosis } = useAddDiagnosis();

  const { latestDiagnosis } = useGetLatestDiagnosis(patientId);
  const { todaysDiagnosis } = useGetTodaysDiagnosis(patientId);

  useEffect(() => {
    setPhysicalExamination((prev) => ({
      ...prev,
      abdomen: todaysDiagnosis?.abdomen,
      allergyHistory: todaysDiagnosis?.allergyHistory,
      bp: todaysDiagnosis?.bp,
      chest: todaysDiagnosis?.chest,
      cns: todaysDiagnosis?.cns,
      cvs: todaysDiagnosis?.cvs,
      entguSys: todaysDiagnosis?.entguSys,
      extremity: todaysDiagnosis?.extremity,
      familyHistory: todaysDiagnosis?.familyHistory,
      gApp: todaysDiagnosis?.gApp,
      gus: todaysDiagnosis?.gus,
      heent: todaysDiagnosis?.heent,
      impression: todaysDiagnosis?.impression,
      mss: todaysDiagnosis?.mss,
      others: todaysDiagnosis?.others,
      pastSurgicalHistory: todaysDiagnosis?.pastSurgicalHistory,
      pr: todaysDiagnosis?.pr,
      respiRate: todaysDiagnosis?.respiRate,
      temp: todaysDiagnosis?.temp,
      underlyingChronicIllness: todaysDiagnosis?.underlyingChronicIllness,
    }));
    setHistory((prev) => ({
      ...prev,
      familyHistory: latestDiagnosis?.familyHistory,
      pastSurgicalHistory: latestDiagnosis?.pastSurgicalHistory,
      allergyHistory: latestDiagnosis?.allergyHistory,
      underlyingChronicIllness: latestDiagnosis?.underlyingChronicIllness,
      presentIllness: todaysDiagnosis?.presentIllness,
      riskFactor: todaysDiagnosis?.riskFactor,
      recentAdmission: todaysDiagnosis?.recentAdmission,
    }));
    setChiefComplaint(todaysDiagnosis?.chiefComplaint);
  }, [latestDiagnosis, todaysDiagnosis]);

  useEffect(() => {}, [setPhysicalExamination, todaysDiagnosis]);

  function handleSubmit(e) {
    e.preventDefault();

    addDiagnosis({
      patientId,
      doctorId,
      ...history,
      ...physicalExamination,
      chiefComplaint,
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-md bg-white p-3">
        <form action="">
          <label htmlFor="chief" className="flex flex-col gap-3">
            <span className="ml-1 text-2xl">Chief Complaint</span>
            <textarea
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              name=""
              id="chief"
              cols="30"
              rows="3"
              placeholder="Write Chief Complaint"
              className="w-full rounded-md border border-black/40 p-2 placeholder:text-black/40 "
            ></textarea>
          </label>
        </form>
        <form action="" className="mt-2 grid grid-cols-4">
          <ComplaintCheckBox
            complaint={"Abdominal Pain"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Blurred vision"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Chest pain"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Cough"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Diarrhea"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Dizziness"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Fever/ Chills/ Sweats"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Headache"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Joint pain"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Neck mass"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Numbness"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Palpitations"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Shortness of breath"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Tender neck"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Vomiting"}
            handleCheckboxChange={handleCheckboxChange}
          />
          <ComplaintCheckBox
            complaint={"Weakness"}
            handleCheckboxChange={handleCheckboxChange}
          />
        </form>
      </div>
      <div className="rounded-md bg-white p-3">
        <h2 className="mb-3 ml-1 text-2xl">History</h2>
        <form action="" className="flex flex-col gap-3">
          <label htmlFor="presentIllness" className="flex flex-col gap-1">
            <span className="ml-1 text-sm font-bold">
              History of Present Illness
            </span>
            <textarea
              value={history["presentIllness"]}
              onChange={(e) =>
                setHistory((prev) => ({
                  ...prev,
                  presentIllness: e.target.value,
                }))
              }
              name=""
              id="presentIllness"
              cols="30"
              rows="2"
              placeholder="Present Illness"
              className="w-full rounded-md border border-black/40 p-2 placeholder:text-black/40 "
            ></textarea>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label htmlFor="riskFactor" className="flex flex-col gap-1">
              <span className="ml-1 text-sm font-bold">Risk Factor</span>
              <textarea
                value={history["riskFactor"]}
                onChange={(e) =>
                  setHistory((prev) => ({
                    ...prev,
                    riskFactor: e.target.value,
                  }))
                }
                name=""
                id="riskFactor"
                cols="30"
                rows="2"
                placeholder="Risk Factor"
                className="w-full rounded-md border border-black/40 p-2 placeholder:text-black/40 "
              ></textarea>
            </label>
            <label htmlFor="allergyHistory" className="flex flex-col gap-1">
              <span className="ml-1 text-sm font-bold">Allergy History</span>
              <textarea
                value={history["allergyHistory"]}
                onChange={(e) =>
                  setHistory((prev) => ({
                    ...prev,
                    allergyHistory: e.target.value,
                  }))
                }
                name=""
                id="allergyHistory"
                cols="30"
                rows="2"
                placeholder="Allergy History"
                className="w-full rounded-md border border-black/40 p-2 placeholder:text-black/40 "
              ></textarea>
            </label>
            <label htmlFor="chronic" className="flex flex-col gap-1">
              <span className="ml-1 text-sm font-bold">
                Underlying Chronic Illness
              </span>
              <textarea
                value={history["underlyingChronicIllness"]}
                onChange={(e) =>
                  setHistory((prev) => ({
                    ...prev,
                    underlyingChronicIllness: e.target.value,
                  }))
                }
                name=""
                id="chronic"
                cols="30"
                rows="2"
                placeholder="Underlying Chronic Illness"
                className="w-full rounded-md border border-black/40 p-2 placeholder:text-black/40 "
              ></textarea>
            </label>
            <label
              htmlFor="pastSurgicalHistory"
              className="flex flex-col gap-1"
            >
              <span className="ml-1 text-sm font-bold">
                Past Surgical History
              </span>
              <textarea
                value={history["pastSurgicalHistory"]}
                onChange={(e) =>
                  setHistory((prev) => ({
                    ...prev,
                    pastSurgicalHistory: e.target.value,
                  }))
                }
                name=""
                id="pastSurgicalHistory"
                cols="30"
                rows="2"
                placeholder="Past Surgical History"
                className="w-full rounded-md border border-black/40 p-2 placeholder:text-black/40 "
              ></textarea>
            </label>
            <label htmlFor="recentAdmission" className="flex flex-col gap-1">
              <span className="ml-1 text-sm font-bold">Recent Admission</span>
              <textarea
                value={history["recentAdmission"]}
                onChange={(e) =>
                  setHistory((prev) => ({
                    ...prev,
                    recentAdmission: e.target.value,
                  }))
                }
                name=""
                id="recentAdmission"
                cols="30"
                rows="2"
                placeholder="Recent Admission"
                className="w-full rounded-md border border-black/40 p-2 placeholder:text-black/40 "
              ></textarea>
            </label>
            <label htmlFor="familyHistory" className="flex flex-col gap-1">
              <span className="ml-1 text-sm font-bold">
                Personal/ Social/ Family History
              </span>
              <textarea
                value={history["familyHistory"]}
                onChange={(e) =>
                  setHistory((prev) => ({
                    ...prev,
                    familyHistory: e.target.value,
                  }))
                }
                name=""
                id="familyHistory"
                cols="30"
                rows="2"
                placeholder="Personal/ Social/ Family History"
                className="w-full rounded-md border border-black/40 p-2 placeholder:text-black/40 "
              ></textarea>
            </label>
          </div>
        </form>
      </div>
      <div className="rounded-md bg-white p-3">
        <form action="" className="flex flex-col gap-3">
          <label htmlFor="others" className="flex flex-col  gap-3">
            <span className="ml-1 text-2xl">Physical Examination</span>
            <textarea
              value={physicalExamination["others"]}
              onChange={(e) =>
                setPhysicalExamination((prev) => ({
                  ...prev,
                  others: e.target.value,
                }))
              }
              name=""
              id="others"
              cols="30"
              rows="2"
              placeholder="Write Physical Examination"
              className="w-full rounded-md border border-black/40 p-2 placeholder:text-black/40 "
            ></textarea>
          </label>
          <div className="flex gap-2">
            <label htmlFor="bp" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">BP</span>
              <input
                id="bp"
                value={physicalExamination["bp"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    bp: e.target.value,
                  }))
                }
                type="text"
                placeholder="mmHg"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
            <label htmlFor="pr" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">PR</span>
              <input
                id="pr"
                value={physicalExamination["pr"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    pr: e.target.value,
                  }))
                }
                type="text"
                placeholder="bpm"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
            <label htmlFor="respiRate" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">RESPI RATE</span>
              <input
                id="respiRate"
                value={physicalExamination["respiRate"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    respiRate: e.target.value,
                  }))
                }
                type="text"
                placeholder="bpm"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
            <label htmlFor="temp" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">TEMP</span>
              <input
                id="temp"
                value={physicalExamination["temp"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    temp: e.target.value,
                  }))
                }
                type="text"
                placeholder="&deg;C"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
          </div>
          <div className="flex gap-2">
            <label htmlFor="gApp" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">G_APP</span>
              <textarea
                id="gApp"
                value={physicalExamination["gApp"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    gApp: e.target.value,
                  }))
                }
                type="text"
                placeholder="G_APP"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
            <label htmlFor="heent" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">HEENT</span>
              <textarea
                id="heent"
                value={physicalExamination["heent"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    heent: e.target.value,
                  }))
                }
                type="text"
                placeholder="HEENT"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
          </div>
          <div className="flex gap-2">
            <label htmlFor="chest" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">CHEST</span>
              <textarea
                id="chest"
                value={physicalExamination["chest"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    chest: e.target.value,
                  }))
                }
                type="text"
                placeholder="CHEST"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
            <label htmlFor="cvc" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">CVS</span>
              <textarea
                id="cvc"
                value={physicalExamination["cvs"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    cvs: e.target.value,
                  }))
                }
                type="text"
                placeholder="CVS"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
          </div>
          <div className="flex gap-2">
            <label htmlFor="abdomen" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">ABDOMEN</span>
              <textarea
                id="abdomen"
                value={physicalExamination["abdomen"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    abdomen: e.target.value,
                  }))
                }
                type="text"
                placeholder="ABDOMEN"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
            <label htmlFor="gus" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">GUS</span>
              <textarea
                id="gus"
                value={physicalExamination["gus"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    gus: e.target.value,
                  }))
                }
                type="text"
                placeholder="GUS"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
          </div>
          <div className="flex gap-2">
            <label htmlFor="mss" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">MSS</span>
              <textarea
                id="mss"
                value={physicalExamination["mss"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    mss: e.target.value,
                  }))
                }
                type="text"
                placeholder="MSS"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
            <label htmlFor="cns" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">CNS</span>
              <textarea
                id="cns"
                value={physicalExamination["cns"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    cns: e.target.value,
                  }))
                }
                type="text"
                placeholder="CNS"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
          </div>
          <div className="flex gap-2">
            <label htmlFor="extremity" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">EXTREMITY</span>
              <textarea
                id="extremity"
                value={physicalExamination["extremity"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    extremity: e.target.value,
                  }))
                }
                type="text"
                placeholder="EXTREMEITY"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
            <label htmlFor="entguSys" className="flex flex-1  flex-col gap-1">
              <span className="ml-1 text-sm font-bold">ENTGU SYS</span>
              <textarea
                id="entguSys"
                value={physicalExamination["entguSys"]}
                onChange={(e) =>
                  setPhysicalExamination((prev) => ({
                    ...prev,
                    entguSys: e.target.value,
                  }))
                }
                type="text"
                placeholder="ENTGU SYS"
                className="rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
              />
            </label>
          </div>
        </form>
      </div>
      <div className="rounded-md bg-white p-3">
        <label htmlFor="impression" className="flex flex-1  flex-col gap-1">
          <span className="ml-1 text-2xl ">Impression</span>
          <textarea
            id="impression"
            value={physicalExamination["impression"]}
            onChange={(e) =>
              setPhysicalExamination((prev) => ({
                ...prev,
                impression: e.target.value,
              }))
            }
            type="text"
            placeholder="Impression"
            className="mt-1 rounded-md border border-black/40 px-3 py-2 placeholder:text-black/40"
          />
        </label>
      </div>
      <div>
        <button
          className="ml-auto block rounded-md bg-green-800 px-4 py-2 text-green-50 disabled:bg-gray-400"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default DoctorWriteDiagnosis;
