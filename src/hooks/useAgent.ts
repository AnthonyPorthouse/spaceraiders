import { useContext } from "react";
import { AgentContext } from "../contexts/AgentContext";

export default function useAgent() {
    return useContext(AgentContext);
}
