import axios from "axios";
import { BASE_URL } from "./base";
import { APIResponse, Agent } from "./types";

export default async function getMyAgent(token: string) {
    return (await axios.get<APIResponse<Agent>>(`${BASE_URL}/my/agent`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data.data
}
