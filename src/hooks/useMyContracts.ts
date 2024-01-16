import { useQuery } from "@tanstack/react-query";
import getMyContracts from "../api/myContracts";
import useAuth from "./useAuth";

export default function useMyContracts(
  page: number | undefined = 1,
  limit: number | undefined = 10,
) {
  const { token } = useAuth();
  const query = useQuery({
    queryKey: ["my-contracts", token, page, limit],
    queryFn: async () => {
      return await getMyContracts(token!, page, limit);
    },
  });

  return query;
}
