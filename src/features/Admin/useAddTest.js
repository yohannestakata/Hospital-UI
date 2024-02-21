import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { addTests } from "../../services/testsApi";

function useAddTest() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: addTests,
    onSuccess: () => {
      toast.success("Test added");
      navigate("/admin");
    },
  });

  return { addTest: mutate };
}

export default useAddTest;
