import { useQuery } from "@tanstack/react-query";
import { supabase } from ".";
import { ItemType } from "../types/item.type";

export const useGetItems = () => {
  const query = useQuery({
    queryKey: ["item"],
    queryFn: async () => {
      const { data: item } = await supabase
        .from("item")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      return item;
    },
  });
  return query;
};

export const upsertItems = async (items: ItemType[]) => {
  const query = await supabase.from("item").upsert(items);

  return query;
};
