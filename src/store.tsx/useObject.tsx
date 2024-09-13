import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { useLoading } from "../Loading/Loading";
import { SummaryObjectType } from "../types/account.type";
import { DBResponseType } from "../types/fetch.type";
import { ObjectifType } from "../types/objectif.type";
import store from "./store";
import { toast } from "react-toastify";

export const useObjectif = () => {
  const { accountId } = useParams();
  const { user } = store;
  const { setIsLoading } = useLoading();
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
    isLoading,
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

  useEffect(() => {
    setIsLoading(isLoading);
    console.log("isLoading", isLoading);
  }, [isLoading]);

  const upsertObjectif = useMutation({
    mutationFn: async (data: Partial<ObjectifType>) => {
      const res = await api.post<DBResponseType<{ objetif: ObjectifType }>>(
        "/objectif",
        data
      );
      if (res) {
        return res.data;
      }
    },
    onMutate: () => {
      toast.info("Enregistrement en cours", { isLoading: true });
    },
    onSuccess: (data) => {
      if (data?.statusCode === 201) {
        refetch();
        toast.dismiss();
        toast.success("Modification enregistrée");
      }
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message || "Erreur lors de l'enregistrement");
    },
  });

  return { data, refetch, upsertObjectif: upsertObjectif.mutate };
};
