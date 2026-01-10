import { api } from "./api";

export const allocateCase = async (
  accountId: number,
  dcaId: number
) => {
  return api.post("/api/allocation", {
    accountId,
    dcaId,
  });
};
