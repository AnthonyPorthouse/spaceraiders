import { useQuery } from "@tanstack/react-query";
import getFactions from "../api/factions";

export default function useFactions(page: number, limit: number) {
    const query = useQuery({
        queryKey: ['factions', page, limit],
        queryFn: async () => {
            return await getFactions();
        }
    })

    return query;
}
