import { api } from "../api/axios.ts";
import { supabase } from "../store.tsx";
import { DBResponseType } from "../types/fetch.type.ts";

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    const res = await api.post<
      DBResponseType<{
        user: Partial<{
          id: string;
          createdAt: Date;
          confirmed: boolean;
          confirmedAt: Date;
          email: string;
          role: string;
          name: string;
        }>;
      }>
    >(`/auth/login`, {
      username: email,
      password,
    });

    console.log(res.data);

    if (res.data.data) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("login", "login");
      window.location.replace("/");
    }
  };

  const logout = async () => {
    const res = await supabase.auth.signOut();
    if (res.error) {
      console.log(res.error.message);
    }
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    window.location.replace("/auth");
  };

  return {
    login,
    logout,
  };
};
