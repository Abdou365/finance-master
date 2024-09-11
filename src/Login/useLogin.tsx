import axios from "axios";
import { api } from "../api/axios.ts";
import store from "../store.tsx/store.ts";
import { DBResponseType } from "../types/fetch.type.ts";
import { toast } from "react-toastify";

export function useAuth() {
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

    console.log(res);

    if (res.status === 401) {
      toast.error("Email ou mot de passe incorrect");
    }
    if (res.status === 201) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      toast.success("Mail de confirmation envoyé");
    }

    return res.data;
  };

  const logout = async () => {
    const res = await axios.get(`/auth/logout/${store.user()?.id}`);
    if (res.status === 200) {
      localStorage.removeItem("login");
      localStorage.removeItem("user");
      window.location.replace("/auth");
    }
  };

  const register = async (email: string, password: string) => {
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
    >(`/auth/register`, {
      email,
      password,
    });

    return res.data;
  };

  const confirmRegistration = async (token: string, code: number) => {
    const res = await api.post<DBResponseType<null>>(
      `/auth/confirm/registration`,
      {
        token,
        code,
      }
    );
    if (res.data.statusCode === 201) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("login", "login");
    }

    return res.data;
  };

  const confirmLogin = async (token: string, code: number) => {
    const res = await api.post<DBResponseType<null>>(`/auth/confirm/login`, {
      token,
      code,
    });
    if (res.data.statusCode === 201) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("login", "login");
      toast.success("Connexion réussie");
    } else {
      toast.error("Code de confirmation incorrect");
    }

    return res.data;
  };

  const recoverPassword = async (email: string) => {
    const res = await api.post<DBResponseType<null>>(`/auth/recover`, {
      email,
    });

    return res.data;
  };
  const changePassword = async ({
    email,
    password,
    newPassword,
    token,
    code,
  }: {
    email: string;
    password: string;
    newPassword: string;
    token?: string;
    code?: number;
  }) => {
    const res = await api.post<DBResponseType<null>>(`/auth/recover-password`, {
      email,
      password,
      newPassword,
      token,
      code,
    });

    if (res.status === 401) {
      toast.error("Email ou mot de passe incorrect");
    }

    if (res.data.statusCode === 201) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("login", "login");
      toast.success("Connexion réussie");
      window.location.replace("/");
    }

    return res.data;
  };

  const confirmRecoverPassword = async (
    token: string,
    code: number,
    password: string,
    password_confirmation: string
  ) => {
    const res = await api.post<DBResponseType<null>>(`/auth/confirm/recover`, {
      token,
      code,
      password,
      password_confirmation,
    });

    if (res.data.statusCode === 201) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("login", "login");
    }

    return res.data;
  };

  return {
    register,
    login,
    logout,
    confirmRegistration,
    confirmLogin,
    recoverPassword,
    confirmRecoverPassword,
    changePassword,
  };
}
