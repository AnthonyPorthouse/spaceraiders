import { useMutation } from "@tanstack/react-query";
import "./App.css";
import registerAgent from "./api/registerAgent";
import { SyntheticEvent, useState } from "react";
import useAuth from "./hooks/useAuth";
import useAgent from "./hooks/useAgent";
import type { FactionSymbol } from "./api/types";
import CurrentAgent from "./CurrentAgent";
import useFactions from "./hooks/useFactions";
import Navigation from "./Navigation";

function App() {
  const [callsign, setCallsign] = useState("");
  const [faction, setFaction] = useState<FactionSymbol>("COSMIC");

  const auth = useAuth();
  const agent = useAgent();
  const factions = useFactions(1, 20);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    mutation.mutate({ callsign, faction });
  }

  const mutation = useMutation({
    mutationKey: ["create-agent"],
    mutationFn: async ({
      callsign,
      faction,
    }: {
      callsign: string;
      faction: string;
    }) => {
      const res = await registerAgent(callsign, faction);

      const { token, agent: newAgent } = res;

      auth.setToken(token);
      agent.setCallsign(newAgent.symbol);
      agent.setFaction(newAgent.startingFaction);
    },
  });

  return (
    <main className=" bg-gradient-to-b from-blue-950 to-indigo-950  text-white min-h-dvh flex flex-row gap-16">
      <Navigation />

      <CurrentAgent />

      {!auth.token ?? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="callsign"
            id="callsign"
            value={callsign}
            onChange={(e) => {
              setCallsign(e.currentTarget.value);
            }}
          />

          {factions.isLoading && (
            <select disabled>
              <option>Loading</option>
            </select>
          )}
          {factions.isSuccess && (
            <select
              id="faction"
              name="faction"
              value={faction}
              onChange={(e) => {
                setFaction(e.currentTarget.value as FactionSymbol);
              }}
            >
              {factions.data.map((faction) => (
                <option key={faction.symbol} value={faction.symbol}>
                  {faction.name}
                </option>
              ))}
            </select>
          )}

          <button>Create Agent</button>
        </form>
      )}
    </main>
  );
}

export default App;
