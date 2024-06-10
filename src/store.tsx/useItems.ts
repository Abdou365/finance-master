import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { DBResponseType } from "../types/fetch.type";
import { ItemType } from "../types/item.type";

export const useGetItems = (accountId: string, page: number) => {
  const query = useQuery({
    queryKey: ["getAllItems", accountId, page],
    queryFn: async () => {
      const { data } = await api.get<
        DBResponseType<{ items: ItemType[]; count: number; pageCount: number }>
      >(`/item/all/${accountId}?page=${page}&limit=48`);
      return data.data;
    },
  });
  return query;
};

export const upsertItems = async (items: ItemType[]) => {
  const query = await api.post("/item", items);
  return query;
};

export const useGetItemsCategory = () => {
  const { accountId } = useParams();
  const query = useQuery<string[]>({
    queryKey: ["getAllItems"],
    staleTime: 60 * 60 * 10,
    queryFn: async () => {
      const { data: item } = await api.get(`/item/category/${accountId}`);
      return item;
    },
  });
  return query;
};
