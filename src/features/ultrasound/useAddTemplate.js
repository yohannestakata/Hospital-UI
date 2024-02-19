import { useMutation } from "react-query";
import { addTemplates } from "../../services/templatesApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useAddTemplate() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: addTemplates,
    onSuccess: () => {
      toast.success("Template added successfully");
      navigate("/ultrasound");
    },
  });
  return { addTemplate: mutate };
}

export default useAddTemplate;
