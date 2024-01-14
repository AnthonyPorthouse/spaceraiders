import { ReactNode, createContext, useState } from "react";

type AgentContext = {
  callsign: string;
  setCallsign: (callsign: string) => void;
  faction: string;
  setFaction: (faction: string) => void;
};

export const AgentContext = createContext<AgentContext>({
  callsign: "",
  setCallsign(_) {},
  faction: "",
  setFaction(_) {},
});

AgentContext.displayName = "AgentContext";

export default function AgentProvider({ children }: { children: ReactNode }) {
  const [callsign, setCallsign] = useState<string>("");
  const [faction, setFaction] = useState<string>("");

  return (
    <AgentContext.Provider
      value={{
        callsign,
        setCallsign,
        faction,
        setFaction,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}
