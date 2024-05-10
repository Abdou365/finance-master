import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ItemType } from "../types/item.type";

export const useGetItems = (accountId?: string) => {
  const query = useQuery({
    queryKey: ["item"],
    queryFn: async () => {
      const { data: item } = await axios.get(
        `http://localhost:3000/item/${accountId}`
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
