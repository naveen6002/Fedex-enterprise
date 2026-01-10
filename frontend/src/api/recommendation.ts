import { api } from "./api";

export type Recommendation = {
  accountId: number;
  dcaId: number;
  dcaName: string;
  reason: string;
};

export const getRecommendations = async (regionId: number) => {
  const res = await api.get<Recommendation[]>(
    `/api/recommendation/${regionId}?page=0&size=10`
  );
  return res.data;
};
