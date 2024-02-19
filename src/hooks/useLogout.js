import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const logout = function () {
    Cookies.remove("jwt_token");
    navigate("/login");
  };
  return { logout };
}

export default useLogout;
