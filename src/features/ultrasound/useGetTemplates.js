import { useQuery } from "react-query";
import { getTemplates } from "../../services/templatesApi";

function useGetTemplates() {
  const { data } = useQuery({
    queryFn: getTemplates,
    queryKey: ["templates"],
  });

  return { templates: data?.data.data };
}

export default useGetTemplates;
