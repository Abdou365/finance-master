import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SummaryObjectType } from "../types/account.type";
import { DBResponseType } from "../types/fetch.type";
import { ObjectifType } from "../types/objectif.type";
import store from "./store";

export const useGetAllObjectif = () => {
  const { accountId } = useParams();
  const { user } = store;
  const {
    data = {
      objectifs: [],
      summary: { completed: 0, opened: 0, total: 0, progress: 0 },
    },
    refetch,
  } = useQuery({
    queryKey: ["getAllObjectif"],
    queryFn: async () => {
      const res = await axios.get<
        DBResponseType<{
          objectifs: ObjectifType[];
          summary: SummaryObjectType;
        }>
      >("http://localhost:3000/objectif/all/" + user()?.id + "/" + accountId);
      if (res) {
        return res.data.data;
      }
    },
  });
  return { data, refetch };
};
export const upsertObjectif = async (data: Partial<ObjectifType>) => {
  const res = await axios.post<DBResponseType<{ objetif: ObjectifType }>>(
    "http://localhost:3000/objectif",
    data
  );
  if (res) {
    return res.data;
  }
};
