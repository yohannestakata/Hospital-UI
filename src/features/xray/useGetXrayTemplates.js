import { useQuery } from "react-query";
import { getXrayTemplates } from "../../services/templatesApi";

function useGetXrayTemplates() {
  const { data } = useQuery({
    queryFn: getXrayTemplates,
    queryKey: ["ultraTemp"],
  });

  return { templates: data?.data.files };
}

export default useGetXrayTemplates;
