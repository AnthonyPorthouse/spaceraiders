import axios from "axios";
import { Temporal } from "temporal-polyfill";
import { BASE_URL } from "./base";
import { Status } from "./types";

export type StatusResponse = {
  status: string;
  version: string;
  resetDate: string;
  description: string;

  serverResets: {
    next: string;
    frequency: string;
  };
};

export default async function getStatus(): Promise<Status> {
  const data = (await axios.get<StatusResponse>(`${BASE_URL}/`)).data;

  return {
    ...data,
    resetDate: Temporal.PlainDate.from(data.resetDate),
    serverResets: {
      ...data.serverResets,
      next: Temporal.Instant.from(data.serverResets.next),
    },
  };
}
