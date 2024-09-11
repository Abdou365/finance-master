import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../api/axios.ts";
import { useLoading } from "../Loading/Loading.tsx";
import { AccountDashboard, AccountType } from "../types/account.type.ts";
import { DBResponseType } from "../types/fetch.type.ts";
import store from "./store.ts";

export const useAccount = () => {
  const response = useQuery({
    queryKey: ["account", store.user()?.id],
    queryFn: async () => {
      const res = await api.get<AccountType[]>(
        `/account/all/${store.user()?.id}`
      );
      return res.data;
    },
  });

  return response;
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

  if (response.isSuccess) {
    return response.data;
  }
};

export const upsertAcount = async (params: {
  id?: string;
  title?: string;
  description?: string;
}) => {
  const res = await api.post<DBResponseType<any>>("/account", {
    ...params,
    userId: store.user()?.id,
  });

  return res.data;
};

export const deleteAccount = async (id: string) => {
  const userId = store.user()?.id;
  const res = await api.delete<DBResponseType<any>>(`/account/${userId}/${id}`);

  if (res.status === 200) {
    toast.success("Account deleted successfully");
  } else {
    toast.error("Failed to delete account");
  }
  return res.data;
};
