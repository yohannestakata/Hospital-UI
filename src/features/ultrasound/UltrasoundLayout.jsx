import { NavLink, Outlet } from "react-router-dom";

import { FaWifi, FaXRay } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import useLogout from "../../hooks/useLogout";

function UltrasoundLayout() {
  const { logout } = useLogout();
  return (
    <div className="h-full overflow-hidden">
      <div className="flex h-screen p-2 ">
        <div className="flex h-full w-72 flex-col gap-1 overflow-auto rounded-md bg-white px-3">
          <div className="flex flex-col gap-1 border-b py-2">
            <span className="mb-1 font-bold">Waiting List</span>
            <NavLink
              to={`/ultrasound/waitinglist`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaListCheck className="opacity-70" />
              Waiting List
            </NavLink>
          </div>
          <div className="flex flex-col gap-1 border-b py-2">
            <span className="mb-1 font-bold">Add Templates</span>
            <NavLink
              to={`/ultrasound/add-ultra-templ`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaWifi className="opacity-70" />
              Ultrasound
            </NavLink>
            <NavLink
              to={`/ultrasound/add-xray-templ`}
              className="flex items-center gap-3 rounded-md px-4 py-2 hover:bg-green-800 hover:text-slate-50"
            >
              <FaXRay className="opacity-70" />
              X-ray
            </NavLink>
          </div>
          <div className="mt-auto">
            <button
              onClick={() => logout()}
              className="mb-2 w-full rounded-md border border-black/50 py-1"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="w-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UltrasoundLayout;
