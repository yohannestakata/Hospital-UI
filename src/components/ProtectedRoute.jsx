import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetUserByToken from "../hooks/useGetUserbyToken";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, isLoading } = useGetUserByToken();

  useEffect(() => {
    const handleNavigation = async () => {
      if (isLoading) return;

      const role = user?.user.role;
      if (!user) {
        navigate("/login");
      } else if (role === "nurse") {
        navigate("/nurse");
      } else if (role === "doctor") {
        navigate("/doctor");
      } else if (role === "reception") {
        navigate("/reception");
      } else if (role === "ultrasound") {
        navigate("/ultrasound");
      } else if (role === "xray") {
        navigate("/xray");
      } else if (role === "lab") {
        navigate("lab-results");
      } else if (role === "admin") {
        navigate("/admin");
      }
    };

    handleNavigation();
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
}

export default ProtectedRoute;
