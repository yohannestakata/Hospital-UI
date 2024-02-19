import { Outlet } from "react-router-dom";

function AppLayout() {
  // const navigate = useNavigate();

  return (
    <div className="h-screen overflow-auto bg-black/5 print:invisible">
      <div className="flex h-full flex-col">
        {/* <div className="flex gap-3">
          <button onClick={() => navigate("/reception")}>Reception</button>
          <button onClick={() => navigate("/doctor")}>Doctor </button>
          <button onClick={() => navigate("/nurse")}>Nurse </button>
          <button onClick={() => navigate("/ultrasound")}>Ultrasound </button>
          <button onClick={() => navigate("/xray")}>Xray </button>
          <button onClick={() => navigate("/lab-results")}>Lab </button>
          <button onClick={() => navigate("/Admin")}>Admin </button>
          <button onClick={() => navigate("/login")}>Login </button>
        </div> */}
        <div className="flex-1 font-primary print:text-black">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
