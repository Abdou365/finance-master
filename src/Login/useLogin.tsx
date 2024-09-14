import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/axios.ts";
import store from "../store.tsx/store.ts";
import { DBResponseType } from "../types/fetch.type.ts";

type LoginResponse = DBResponseType<{
  user: Partial<{
    id: string;
    createdAt: Date;
    confirmed: boolean;
    confirmedAt: Date;
    email: string;
    role: string;
    name: string;
  }>;
}>;

export function useAuth() {
  const [, setParams] = useSearchParams({});

  const login = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await api.post<LoginResponse>(`/auth/login`, {
        username: email,
        password,
      });

      if (!res.data) {
        throw new Error("Erreur lors de la connexion");
      }

      return res;
    },
    mutationKey: ["post", "login"],
    onError: (error) => {
      toast.dismiss();
      toast.error("Email ou mot de passe incorrect");
    },
    onMutate: () => {
      toast.info("Connexion en cours", { isLoading: true });
    },
    onSuccess: (data) => {
      toast.dismiss();
      if (data.status === 201) {
        localStorage.setItem("user", JSON.stringify(data.data));
        toast.success("Mail de confirmation envoyé");
        setParams({ step: "send" });
      }
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      return await axios.get(`/auth/logout/${store.user()?.id}`);
    },
    onMutate: () => {
      toast.info("Déconnexion en cours", { isLoading: true });
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Déconnexion réussie");
      if (data.status === 200) {
        localStorage.removeItem("login");
        localStorage.removeItem("user");
        window.location.replace("/auth");
      }
    },
    onError: () => {
      toast.dismiss();
      toast.error("Erreur lors de la déconnexion");
    },
  });

  const logDemo = useMutation({
    mutationFn: async () => {
      const res = await api.get<LoginResponse>(`/auth/demo`);
      return res.data;
    },
    mutationKey: ["get", "demo"],
    onMutate: () => {
      toast.info("Connexion en cours", { isLoading: true });
    },
    onError: () => {
      toast.dismiss();
      toast.error("Erreur lors de la connexion");
    },
    onSuccess: (data) => {
      toast.dismiss();
      if (data.statusCode === 200) {
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("login", "login");
        toast.success("Connexion réussie");
        window.location.replace("/");
      }
    },
  });

  const register = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
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
    },
    mutationKey: ["post", "register"],
    onMutate: () => {
      toast.info("Inscription en cours", { isLoading: true });
    },
    onSuccess: (data) => {
      toast.dismiss();
      if (data.statusCode === 201) {
        localStorage.setItem("user", JSON.stringify(data.data));
        toast.success("Mail de confirmation envoyé");
        setParams({ step: "send" });
      }
    },
    onError: () => {
      toast.dismiss();
      toast.error("Erreur lors de l'inscription");
    },
  });

  const confirRegistration = useMutation({
    mutationFn: async ({ token, code }: { token: string; code: number }) => {
      const res = await api.post<LoginResponse>(`/auth/confirm/registration`, {
        token,
        code,
      });

      return res.data;
    },
    mutationKey: ["post", "confirm-registration"],
    onMutate: () => {
      toast.info("Confirmation en cours", { isLoading: true });
    },
    onError: () => {
      toast.dismiss();
      toast.error("Erreur lors de la confirmation d'inscription");
    },
    onSuccess: (data) => {
      toast.dismiss();
      if (data.statusCode === 201) {
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("login", "login");
        toast.success("Inscription réussie");
        window.location.replace("/");
      }
    },
  });

  const confirmLogin = useMutation({
    mutationFn: async ({ token, code }: { token: string; code: number }) => {
      const res = await api.post<DBResponseType<LoginResponse>>(
        `/auth/confirm/login`,
        {
          token,
          code,
        }
      );
      if (res.data.statusCode === 201) {
      }
      return res.data;
    },
    mutationKey: ["post", "confirm-login"],
    onMutate: () => {
      toast.info("Connexion en cours", { isLoading: true });
    },
    onError: () => {
      toast.dismiss();
      toast.error("Erreur lors de la confirmation de connexion");
    },
    onSuccess: (data) => {
      toast.dismiss();
      if (data.statusCode === 201) {
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("login", "login");
        toast.success("Connexion réussie");
        window.location.replace("/");
      }
    },
  });

  const recoverPassword = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const res = await api.post<DBResponseType<null>>(`/auth/recover`, {
        email,
      });

      return res.data;
    },
    mutationKey: ["post", "recover"],
    onMutate: () => {
      toast.info("Récupération en cours", { isLoading: true });
    },
    onError: () => {
      toast.dismiss();
      toast.error("Erreur lors de la récupération de mot de passe");
    },
    onSuccess: (data) => {
      toast.dismiss();
      if (data.statusCode === 201) {
        toast.success("Email de récupération envoyé");
        setParams({ step: "send" });
      }
    },
  });

  const changePassword = useMutation({
    mutationFn: async ({
      email,
      password,
      code,
      token,
    }: {
      email: string;
      password: string;
      code: number;
      token: string;
    }) => {
      const res = await api.post<LoginResponse>(`/auth/recover-password`, {
        email,
        password,
        token,
        code,
      });

      return res.data;
    },
    mutationKey: ["post", "recover-password"],
    onMutate: () => {
      toast.info("Modification en cours"), { isLoading: true };
    },
    onError: () => {
      toast.dismiss();
      toast.error("Erreur lors de la modification de mot de passe");
    },
    onSuccess: (data) => {
      toast.dismiss();
      if (data.statusCode === 201) {
        toast.success("Mot de passe modifié");
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("login", "login");
        window.location.replace("/");
        setParams({ step: "send" });
      }
    },
  });

  return {
    register: register.mutate,
    login: login.mutate,
    logDemo: logDemo.mutate,
    logout: logout.mutate,
    confirmRegistration: confirRegistration.mutate,
    confirmLogin: confirmLogin.mutate,
    recoverPassword: recoverPassword.mutate,
    changePassword: changePassword.mutate,
  };
}
