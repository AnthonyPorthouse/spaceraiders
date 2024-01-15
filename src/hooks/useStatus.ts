import { useQuery } from "@tanstack/react-query";
import getStatus from "../api/status";

export default function useStatus() {
  return useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      return await getStatus();
    },
  });
}
