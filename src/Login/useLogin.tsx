import { supabase } from "../store.tsx";

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (res.data.session) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
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
