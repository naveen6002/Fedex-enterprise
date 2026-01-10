import { api } from "./api";

export const runCaseIntelligence = async (page = 0, size = 5) => {
  const res = await api.post(
    `/api/case-intelligence/run?page=${page}&size=${size}`
  );
  return res.data;
};
