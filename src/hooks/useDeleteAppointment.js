import { useMutation, useQueryClient } from "react-query";
import { deleteAppointment } from "../services/appointmentsApi";

function useDeleteAppointment() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
    },
  });
  return { deleteAppointment: mutate };
}

export default useDeleteAppointment;
