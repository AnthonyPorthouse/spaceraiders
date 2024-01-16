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
import useMyContracts from "./hooks/useMyContracts";

function App() {
  const [callsign, setCallsign] = useState("");
  const [faction, setFaction] = useState<FactionSymbol>("COSMIC");

  const auth = useAuth();
  const agent = useAgent();
  const factions = useFactions(1, 20);
  const contracts = useMyContracts();

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

      {!auth.token && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="callsign">Callsign</label>
            <input
              className="form-input text-black rounded px-2 py-1"
              type="text"
              name="callsign"
              id="callsign"
              value={callsign}
              onChange={(e) => {
                setCallsign(e.currentTarget.value);
              }}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="faction">Faction</label>
            {factions.isLoading && (
              <select
                id="faction"
                name="faction"
                className="form-select text-black"
                disabled
              >
                <option>Loading</option>
              </select>
            )}
            {factions.isSuccess && (
              <select
                className="form-select text-black rounded px-2 py-1"
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
          </div>

          <button>Create Agent</button>
        </form>
      )}

      {contracts.isSuccess && <div>Current number of contracts: {contracts.data.length}</div>}
    </main>
  );
}

export default App;
