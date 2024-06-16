import axios from "axios";
import { api } from "../api/axios.ts";
import store from "../store.tsx/store.ts";
import { DBResponseType } from "../types/fetch.type.ts";

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

    console.log(res.data);

    if (res.data.data) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
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

    if (res.data.data) {
      // localStorage.setItem("user", JSON.stringify(res.data.data));
      // localStorage.setItem("login", "login");
      // window.location.replace("/");
    }
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
    }

    return res.data;
  };

  const recoverPassword = async (email: string) => {
    const res = await api.post<DBResponseType<null>>(`/auth/recover`, {
      email,
    });

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
  };
}
