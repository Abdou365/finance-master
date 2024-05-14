import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ObjectifType } from "../types/objectif.type";
import { useParams } from "react-router-dom";
import store from "./store";

export const useGetAllObjectif = () => {
  const { accountId } = useParams();
  const { user } = store;
  const { data: objectif } = useQuery({
    queryKey: ["getAllObjectif"],
    queryFn: async () => {
      const res = await axios.get<ObjectifType[]>(
        "http://localhost:3000/objectif/all/" + user()?.id + "/" + accountId
      );
      if (res) {
        return res.data;
      }
    },
  });
  return objectif;
};
export const upsertObjectif = async (data: Partial<ObjectifType>) => {
  const res = await axios.post<ObjectifType[]>(
    "http://localhost:3000/objectif",
    data
  );
  if (res) {
    return res.data;
  }
};
