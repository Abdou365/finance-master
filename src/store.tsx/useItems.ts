import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { DBResponseType } from "../types/fetch.type";
import { ItemType } from "../types/item.type";

export const defaultCategory = [
  { value: "food", label: "Nourriture" },
  { value: "house", label: "Maison" },
  { value: "transport", label: "Transport" },
  { value: "health", label: "Santé" },
  { value: "leisure", label: "Loisir" },
  { value: "other", label: "Autre" },
  { value: "income", label: "Revenu" },
  { value: "saving", label: "Épargne" },
  { value: "investment", label: "Investissement" },
  { value: "gift", label: "Cadeau" },
  { value: "salary", label: "Salaire" },
  { value: "bonus", label: "Bonus" },
  { value: "other", label: "Autre" },
  { value: "other", label: "Autre" },
];

export const useGetItems = (accountId: string, page: number) => {
  const query = useQuery({
    queryKey: ["getAllItems", accountId, page],
    queryFn: async () => {
      const { data } = await api.get<
        DBResponseType<{ items: ItemType[]; count: number; pageCount: number }>
      >(`/item/all/${accountId}?page=${page}&limit=24`);
      return data.data;
    },
  });
  return query;
};

export const upsertItems = async (items: ItemType[], count: number) => {
  const query = await api.post("/item", { items, count });
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
