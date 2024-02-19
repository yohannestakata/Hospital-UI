import { useMutation } from "react-query";
import { deleteFromWaitlist } from "../services/waitinglistApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeleteFromDoctorWailist() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: deleteFromWaitlist,
    onSuccess: () => {
      toast.success("Finished");
      navigate("/doctor");
    },
  });
  return { mutate };
}
export default useDeleteFromDoctorWailist;
