import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { DBResponseType } from "../types/fetch.type";
import { ItemType } from "../types/item.type";
import { useLoading } from "../Loading/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

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

export const useItems = (accountId: string, page: number) => {
  const { setIsLoading } = useLoading();

  const query = useQuery({
    queryKey: ["getAllItems", accountId, page],
    queryFn: async () => {
      const { data } = await api.get<
        DBResponseType<{ items: ItemType[]; count: number; pageCount: number }>
      >(`/item/all/${accountId}?page=${page}&limit=24`);
      return data.data;
    },
  });

  const upsertItems = useMutation<
    DBResponseType<unknown>,
    unknown,
    { items: ItemType[]; count: number }
  >({
    mutationFn: async ({
      items,
      count,
    }: {
      items: ItemType[];
      count: number;
    }) => {
      const { data } = await api.post<DBResponseType<unknown>>("/item", {
        items,
        count,
      });
      return data;
    },
    mutationKey: ["post", "upsertItems"],
    onMutate: (items) => {
      toast.info("Sauvegarde en cours", { isLoading: true });
      return;
    },
    onSuccess: (data) => {
      if (data.statusCode === 201) {
        toast.dismiss();
        toast.success("Sauvegarde réussie");
        query.refetch();
      }
    },
    onError: () => {
      toast.dismiss();
      toast.error("Erreur lors de la sauvegarde");
    },
  });

  useEffect(() => {
    setIsLoading(query.isLoading);
  }, [query.isLoading]);

  return { ...query, upsertItems: upsertItems.mutate };
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
