import { NavLink, Outlet } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { FaSearch, FaStethoscope, FaSyringe, FaUser } from "react-icons/fa";
import {
  FaCalendar,
  FaHospitalUser,
  FaMoneyBillTransfer,
} from "react-icons/fa6";

function ReceptionDash() {
  const { logout } = useLogout();
  return (
    <div className="h-full overflow-hidden font-amharic text-slate-700">
      <div className="flex h-screen p-2">
        <div className="flex h-full w-72 flex-col gap-1 rounded-md bg-white p-3">
          <div className="mb-3 text-2xl">ሪሴፕሽን</div>
          <NavLink
            to={"/reception/add-user"}
            className="nav-link flex items-center gap-3  rounded-md px-4 py-2 hover:bg-green-800 hover:text-green-50 "
          >
            <FaUser className="opacity-70" />
            አዲስ ታካሚ መመዝገብያ
          </NavLink>

          <NavLink
            to={"/reception/search-patient"}
            className="flex items-center gap-3 rounded-md  px-4 py-2 hover:bg-green-800 hover:text-green-50"
          >
            <FaSearch className="opacity-70" />
            ታካሚ ማውጫ
          </NavLink>

          <NavLink
            to={"/reception/direct"}
            className="flex items-center gap-3 rounded-md  px-4 py-2 hover:bg-green-800 hover:text-green-50"
          >
            <FaStethoscope className="opacity-70" />
            ወረፋ ማስጠበቂያ
          </NavLink>
          <NavLink
            to={"/reception/waitlist"}
            className="flex items-center gap-3 rounded-md  px-4 py-2 hover:bg-green-800 hover:text-green-50"
          >
            <FaMoneyBillTransfer className="opacity-70" />
            ትእዛዝ ክፍያ
          </NavLink>
          <NavLink
            to={"/reception/bid"}
            className="flex items-center gap-3 rounded-md  px-4 py-2 hover:bg-green-800 hover:text-green-50"
          >
            <FaSyringe className="opacity-70" />
            የውጭ ታካሚ
          </NavLink>
          <NavLink
            to={"/reception/appointments"}
            className="flex items-center gap-3 rounded-md  px-4 py-2 hover:bg-green-800 hover:text-green-50"
          >
            <FaCalendar className="opacity-70" />
            የዛሬ ቀጠሮዎች
          </NavLink>
          <NavLink
            to={"/reception/add-old-patient"}
            className="flex items-center gap-3 rounded-md  px-4 py-2 hover:bg-green-800 hover:text-green-50"
          >
            <FaHospitalUser className="opacity-70" />
            ነባር ታካሚ መመዝገብያ
          </NavLink>

          <button
            className="mt-auto block rounded-md border border-slate-500 px-4 py-2 text-sm hover:border  hover:border-green-800 hover:text-green-800"
            onClick={logout}
          >
            ውጣ
          </button>
        </div>
        <div className="h-full flex-1 overflow-y-scroll ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ReceptionDash;
