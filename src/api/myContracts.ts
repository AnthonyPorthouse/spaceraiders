import axios from "axios";
import { BASE_URL } from "./base";
import { Contract, FactionSymbol, PaginatedAPIRespose } from "./types";
import { Temporal } from "temporal-polyfill";

type ContractResponse = {
  id: string;
  factionSymbol: FactionSymbol;
  type: "PROCUREMENT" | "TRANSPORT" | "SHUTTLE";
  terms: {
    deadline: string;
    payment: {
      onAccepted: number;
      onFulfilled: number;
    };
    deliver: {
      tradeSymbol: string;
      destinationSymbol: string;
      unitsRequired: number;
      unitsFulfilled: number;
    }[];
  };
  accepted: boolean;
  fulfilled: boolean;
  deadlineToAccept: string;
};

export default async function getMyContracts(
  token: string,
  page: number,
  limit: number,
): Promise<Contract[]> {
  const response = await axios.get<PaginatedAPIRespose<ContractResponse[]>>(
    `${BASE_URL}/my/contracts`,
    {
      params: {
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.data.map((contract) => ({
    ...contract,
    terms: {
      ...contract.terms,
      deadline: Temporal.Instant.from(contract.terms.deadline),
    },
    deadlineToAccept: Temporal.Instant.from(contract.deadlineToAccept),
  }));
}
