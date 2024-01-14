import axios from "axios";
import { BASE_URL } from "./base";
import { APIResponse, Agent } from "./types";

type RegisterAgentData = {
    agent: Agent
    token: string;
}

export default async function registerAgent(callsign: string, faction: string) {
    return (await axios.post<APIResponse<RegisterAgentData>>(`${BASE_URL}/register`, {
        symbol: callsign,
        faction
    })).data.data
}
