import { useQuery } from "@tanstack/react-query";
import { supabase } from "../store.tsx";

export const useAccount = async () => {
  const { data } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      //   const res = await supabase
      //     .from("account")
      //     .select(`*,item!inner(value)`)
      //     .eq("userId", JSON.parse(localStorage.getItem("user")!).id);

      const { res, error } = await supabase.rpc("aure");
      if (error) console.error(error);
      else console.log(data);

      return res;
    },
  });

  return data?.data;
};
