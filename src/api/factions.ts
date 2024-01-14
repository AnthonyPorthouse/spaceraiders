import axios from "axios";
import { BASE_URL } from "./base";
import { Faction, PaginatedAPIRespose } from "./types";

export default async function getFactions(page: number = 1, limit: number = 10) {
    return (await axios.get<PaginatedAPIRespose<Faction[]>>(`${BASE_URL}/factions`, {
        params: {
            page, limit
        }
    })).data.data
}
