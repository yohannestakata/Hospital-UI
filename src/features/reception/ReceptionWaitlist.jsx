import { useNavigate } from "react-router-dom";
import useGetApprovalWaitlist from "./useGetApprovalWaitlist";

function ReceptionWaitlist() {
  const { data } = useGetApprovalWaitlist();

  const waitlist = data?.data.data;

  const navigate = useNavigate();

  function handleOnClick(data) {
    const {
      patientId,
      doctorId,
      vitalsId,
      ultrasoundOrderId,
      xrayOrderId,
      labOrderId,
      waitingId,
      medicineOrderId,
      ecg,
      earIrrigation,
    } = data;

    navigate(
      `/reception/approve-order?patientid=${patientId}&doctorid=${doctorId}&vitalsid=${vitalsId}&ultrasoundid=${ultrasoundOrderId}&xrayid=${xrayOrderId}&labid=${labOrderId}&waitingid=${waitingId}&medicineId=${medicineOrderId}&ecg=${ecg}&earIrrigation=${earIrrigation}`,
    );
  }

  return (
    <div className="mx-4 rounded-md bg-white p-4">
      <h1 className="text-2xl">ትእዛዞች</h1>
      <table className="mt-3 w-full overflow-hidden text-left">
        <thead>
          <tr className="bg-green-800 text-green-50">
            <th className="rounded-l-md px-3 py-2 text-slate-50">የታካሚ ስም</th>
            <th className="px-3 py-2 text-slate-50">አዛዥ</th>
          </tr>
        </thead>
        <tbody className="">
          {waitlist?.map((item) => {
            return (
              <tr
                onClick={() =>
                  handleOnClick({
                    patientId: item.patientId._id,
                    doctorId: item.doctorId._id,
                    labOrderId: item.labOrderId,
                    xrayOrderId: item.xrayOrderId,
                    ultrasoundOrderId: item.ultrasoundOrderId,
                    vitalsId: item.vitalsId,
                    waitingId: item._id,
                    medicineOrderId: item.diagnosisId,
                    ecg: item.ecg,
                    earIrrigation: item.earIrrigation,
                  })
                }
                key={item.waiting_id}
                className="cursor-pointer border-b hover:bg-black/10"
              >
                <td className="rounded-l-md px-3 py-2">
                  {item.patientId.name}
                </td>
                <td className="px-3 py-2">{item.doctorId.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReceptionWaitlist;
