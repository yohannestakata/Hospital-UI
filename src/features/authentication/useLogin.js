import { useMutation, useQueryClient } from "react-query";
import { login } from "../../services/loginApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import useCookies from "../../hooks/useCookies";

function useLogin() {
  const { userId, setUserId } = useUser();
  const navigate = useNavigate();

  const { setCookie, getCookie } = useCookies();

  const queryClient = useQueryClient();
  const { isLoading, data, mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      queryClient.setQueriesData(["user"], data.data.username);
      setCookie(`Bearer ${data?.data.token}`);
      axios.defaults.headers.common["Authorization"] = getCookie();
      setUserId(data.data.user.staff_id);
      toast.success("Successfully logged in");
      navigate("/");
    },
    onError: () => {
      toast.error("Incorrect username or password");
    },
  });

  return { isLoading, data, mutate };
}
export default useLogin;
