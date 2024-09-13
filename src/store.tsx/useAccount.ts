import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../api/axios.ts";
import { useLoading } from "../Loading/Loading.tsx";
import { AccountDashboard, AccountType } from "../types/account.type.ts";
import { DBResponseType } from "../types/fetch.type.ts";
import store from "./store.ts";

export const useAccount = () => {
  const { setIsLoading } = useLoading();
  const userId = store.user()?.id;
  const response = useQuery({
    queryKey: ["account", store.user()?.id],
    queryFn: async () => {
      const res = await api.get<AccountType[]>(
        `/account/all/${store.user()?.id}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    setIsLoading(response.isLoading);
  }, [response.isLoading]);

  if (response.error) {
    toast.error("Erreur lors du chargement des comptes");
  }

  const deleteAccount = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await api.delete<DBResponseType<any>>(
        `/account/${userId}/${id}`
      );

      return res.data;
    },
    mutationKey: ["delete", "account", store.user()?.id],
    onMutate: () => {
      toast.info("Suppression en cours", { isLoading: true });
      return;
    },
    onSuccess: (data) => {
      toast.dismiss();
      if (data.data === 200) {
        toast.success("Compte supprimé avec succès");
      }
      response.refetch();
    },
    onError: () => {
      toast.dismiss();
      toast.error("Erreur lors de la suppression du compte");
    },
  });

  const upsertAcount = useMutation({
    mutationFn: async (params: {
      id?: string;
      title?: string;
      description?: string;
    }) => {
      const res = await api.post<DBResponseType<any>>("/account", {
        ...params,
        userId: store.user()?.id,
      });

      return res;
    },
    mutationKey: ["post", "account", store.user()?.id],
    onMutate: () => {
      toast.info("Sauvegarde en cours", { isLoading: true });
      return;
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        toast.dismiss();
        toast.success("Sauvegarde réussie");
        response.refetch();
        return data;
      }
    },
    onError: () => {
      toast.dismiss();
      toast.error("Erreur lors de la sauvegarde");
    },
  });

  return {
    ...response,
    deleteAccount: deleteAccount.mutate,
    upsertAcount: upsertAcount.mutate,
  };
};
export const useAccountNav = () => {
  const response = useQuery({
    queryKey: ["account-nav", store.user()?.id],
    queryFn: async () => {
      const res = await api.get<{ id: string; title: string }[]>(
        `/account/title/${store.user()?.id}`
      );
      return res.data;
    },
  });

  return response;
};
export const useAccountDashboard = (id?: string) => {
  const { setIsLoading } = useLoading();
  const response = useQuery({
    queryKey: ["account-dashboard", id],
    queryFn: async () => {
      const res = await api.get<AccountDashboard>(`/account/dashboard/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    setIsLoading(response.isLoading);
  }, [response.isLoading]);

  if (response.error) {
    toast.error("Ecchec de chargement du tableau de bord");
  }

  return response.data;
};

// export const upsertAcount = async (params: {
//   id?: string;
//   title?: string;
//   description?: string;
// }) => {
//   const res = await api.post<DBResponseType<any>>("/account", {
//     ...params,
//     userId: store.user()?.id,
//   });

//   return res.data;
// };

// export const deleteAccount = async (id: string) => {
//   const userId = store.user()?.id;
//   const res = await api.delete<DBResponseType<any>>(`/account/${userId}/${id}`);

//   if (res.status === 200) {
//     toast.success("Account deleted successfully");
//   } else {
//     toast.error("Failed to delete account");
//   }
//   return res.data;
// };
