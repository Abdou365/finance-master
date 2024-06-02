import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ItemType } from "../types/item.type";
import { useParams } from "react-router-dom";
import { DBResponseType } from "../types/fetch.type";

export const useGetItems = (accountId: string, page: number) => {
  const query = useQuery({
    queryKey: ["getAllItems", accountId, page],
    staleTime: 60 * 60 * 10,
    queryFn: async () => {
      const { data } = await axios.get<
        DBResponseType<{ items: ItemType[]; count: number; pageCount: number }>
      >(`http://localhost:3000/item/all/${accountId}?page=${page}&limit=24`);
      return data.data;
    },
  });
  return query;
};

export const upsertItems = async (items: ItemType[]) => {
  const query = await axios.post("http://localhost:3000/item", items);

  return query;
};

export const useGetItemsCategory = () => {
  const { accountId } = useParams();
  const query = useQuery<string[]>({
    queryKey: ["getAllItems"],
    staleTime: 60 * 60 * 10,
    queryFn: async () => {
      const { data: item } = await axios.get(
        `http://localhost:3000/item/category/${accountId}`
      );
      return item;
    },
  });
  return query;
};
