import ViewLabResults from "../features/lab/ViewLabResults";
import useLogout from "../hooks/useLogout";

function LabResultsPage() {
  const { logout } = useLogout();
  return (
    <div className="">
      <div className="flex justify-between items-center px-4 mt-2">
        <h1 className="text-xl font-bold">Amede Higher Clinic</h1>
        <button
          className="px-3 py-1 rounded-md border-2 border-slate-500 text-sm"
          onClick={logout}>
          Logout
        </button>
      </div>
      <ViewLabResults />
    </div>
  );
}

export default LabResultsPage;
