import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { SummaryObjectType } from "../types/account.type";
import { DBResponseType } from "../types/fetch.type";
import { ObjectifType } from "../types/objectif.type";
import store from "./store";

export const useGetAllObjectif = () => {
  const { accountId } = useParams();
  const { user } = store;
  const {
    data = {
      savings: [],
      incomes: [],
      summary: {
        objectis: {
          completed: 0,
          opened: 0,
          total: 0,
          progress: 0,
        },
        incomes: {
          completed: 0,
          opened: 0,
          total: 0,
          progress: 0,
        },
        savings: {
          completed: 0,
          opened: 0,
          total: 0,
          progress: 0,
        },
      },
    },
    refetch,
  } = useQuery({
    queryKey: ["getAllObjectif", user()?.id, accountId],
    queryFn: async () => {
      const res = await api.get<
        DBResponseType<{
          savings: ObjectifType[];
          incomes: ObjectifType[];
          summary: {
            objectis: SummaryObjectType;
            incomes: SummaryObjectType;
            savings: SummaryObjectType;
          };
        }>
      >("/objectif/all/" + user()?.id + "/" + accountId);
      if (res) {
        return res.data.data;
      }
    },
  });

  return { data, refetch };
};
export const upsertObjectif = async (data: Partial<ObjectifType>) => {
  const res = await api.post<DBResponseType<{ objetif: ObjectifType }>>(
    "/objectif",
    data
  );
  if (res) {
    return res.data;
  }
};
