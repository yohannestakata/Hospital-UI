import { useQuery } from "react-query";
import { getUserByToken as getUserApi } from "../services/loginApi";
import { useUser } from "../context/UserContext";
import useCookies from "./useCookies";

function useGetUserByToken() {
  const { getCookie } = useCookies();
  const { setUserId } = useUser();

  const token = getCookie();

  const { isLoading, data: user } = useQuery({
    queryFn: () => {
      if (token === "") return null;
      else return getUserApi(token);
    },
    queryKey: ["user", token],
    onSuccess: (data) => {
      if (token !== "") setUserId(data.user._id);
    },
  });

  return { isLoading, user };
}

export default useGetUserByToken;
