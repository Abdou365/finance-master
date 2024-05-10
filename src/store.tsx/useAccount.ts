import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AccountDashboard, AccountType } from "../types/account.type.ts";
import store from "./store.ts";

export const useAccount = () => {
  const response = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const res = await axios.get<AccountType[]>(
        "http://localhost:3000/account"
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
    queryKey: ["account-nav"],
    queryFn: async () => {
      const res = await axios.get<{ id: string; title: string }[]>(
        "http://localhost:3000/account/title"
      );
      return res.data;
    },
  });

  return response;
};
export const useAccountDashboard = (id?: string) => {
  const response = useQuery({
    queryKey: ["account-dashboard"],
    queryFn: async () => {
      const res = await axios.get<AccountDashboard>(
        `http://localhost:3000/account/dashboard/${id}`
      );
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
  return await axios.post("http://localhost:3000/account", {
    ...params,
    userId: store.user()?.id,
  });
};
