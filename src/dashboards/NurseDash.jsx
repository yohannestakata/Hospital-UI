import NurseWaitingList from "../features/nurse/NurseWaitingList";
import useLogout from "../hooks/useLogout";

function NurseDash() {
  const { logout } = useLogout();

  return (
    <div className="p-2 h-screen flex flex-col">
      <div className="flex justify-between items-center px-1">
        <h1 className="text-xl font-bold">Amede Higher Clinic</h1>
        <button
          className="px-3 py-2 rounded-md border-2 border-slate-500 text-sm"
          onClick={logout}>
          Logout
        </button>
      </div>
      <div className="bg-white rounded-md mt-4 overflow-scroll w-full flex-1">
        <NurseWaitingList />
      </div>
    </div>
  );
}

export default NurseDash;
