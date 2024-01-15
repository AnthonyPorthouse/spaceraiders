import { useQuery } from "@tanstack/react-query";
import getMyAgent from "./api/myAgent";
import useAgent from "./hooks/useAgent";
import useAuth from "./hooks/useAuth";

export default function CurrentAgent() {
  const { token } = useAuth();
  const { callsign, setCallsign, faction, setFaction } = useAgent();

  const agentQuery = useQuery({
    queryKey: ["agent", token],
    queryFn: async () => {
      const data = await getMyAgent(token!);

      const { symbol, startingFaction } = data;

      setCallsign(symbol);
      setFaction(startingFaction);

      return data;
    },
    enabled: token !== undefined && callsign === "",
  });

  if (!token) {
    return null;
  }

  if (agentQuery.isSuccess) {
    return (
      <div>
        Current Agent: {callsign} Faction: {faction}
      </div>
    );
  }

  return <div> Loading </div>;
}
