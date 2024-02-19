import { useQuery } from "react-query";
import { getApprovalsList } from "../../services/waitinglistApi";

function useGetApprovalWaitlist() {
  const { isLoading, data } = useQuery({
    queryFn: getApprovalsList,
    queryKey: ["approvalsList"],
  });
  return { isLoading, data };
}

export default useGetApprovalWaitlist;
