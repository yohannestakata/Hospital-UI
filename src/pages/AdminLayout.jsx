import { NavLink, Outlet } from "react-router-dom";

import { FaUser, FaMoneyBill } from "react-icons/fa6";
import useLogout from "../hooks/useLogout";

function AdminLayout() {
  const { logout } = useLogout();

  return (
    <div className="h-full overflow-hidden">
      <div className="flex h-screen p-2 ">
        <div className="flex h-full w-72 flex-col gap-1 rounded-md bg-white p-3">
          <span className="text-2xl">A.H.C Admin</span>

          <div className="flex flex-col gap-1 border-b py-2">
            <span className="mb-1 font-bold">Income</span>
            <NavLink
              to={`/admin/income`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaMoneyBill className="opacity-70" />
              View Income
            </NavLink>
          </div>
          <div className="flex flex-col gap-1 border-b py-2">
            <span className="mb-1 font-bold">Patients</span>
            <NavLink
              to={`/admin/patients`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaUser className="opacity-70" />
              View Patients
            </NavLink>
          </div>
          <button
            className="mt-auto block rounded-md border border-slate-500 px-4 py-2 text-sm hover:border  hover:border-green-800 hover:text-green-800"
            onClick={logout}
          >
            Logout
          </button>
        </div>
        <div className="mx-3 h-full flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
