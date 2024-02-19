import { useUser } from "../context/UserContext";
import DoctorWaitingList from "../features/doctor/DoctorWaitingList";
import { useGetDoctors } from "../hooks/useGetDoctors";
import useLogout from "../hooks/useLogout";

function DoctorDash() {
  const { userId } = useUser();
  const { doctors } = useGetDoctors();
  const doctor = doctors?.filter((doc) => {
    return doc._id === userId;
  })[0];

  const { logout } = useLogout();

  return (
    <div className="px-2 h-screen flex flex-col">
      <div className="flex justify-between items-end px-1 mt-3">
        <span className="font-bold text-xl">Amede Higher Clinic</span>
        <div className="flex gap-4 items-center">
          <h1 className="text-xl">Dr. {doctor?.name}</h1>
          <button
            className="px-3 py-1 rounded-md border border-black/50 text-sm"
            onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="bg-white rounded-md mt-4 overflow-y-scroll w-full flex-1">
        <DoctorWaitingList />
      </div>
    </div>
  );
}

export default DoctorDash;
