import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ItemType } from "../types/item.type";

export const useGetItems = (accountId?: string) => {
  const query = useQuery({
    queryKey: ["getAllItems", accountId],
    staleTime: 60 * 60 * 10,
    queryFn: async () => {
      const { data: item } = await axios.get(
        `http://localhost:3000/item/all/${accountId}`
      );
      return item;
    },
  });
  return query;
};

export const upsertItems = async (items: ItemType[]) => {
  const query = await axios.post("http://localhost:3000/item", items);

  return query;
};

export const useGetItemsCategory = (accountId?: string) => {
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
