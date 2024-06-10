import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios.ts";
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

  if (response.isSuccess) {
    return response.data;
  }
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
  const response = useQuery({
    queryKey: ["account-dashboard", id],
    queryFn: async () => {
      const res = await api.get<AccountDashboard>(`/account/dashboard/${id}`);
      return res.data;
    },
  });

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
