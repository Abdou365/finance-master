import { accountModal } from "../Modal/AccountModal";
import store from "../store.tsx/store";
import { upsertAcount, useAccount } from "../store.tsx/useAccount";
import { AccountCard } from "./AccountCard";
import { v4 as uuidv4 } from "uuid";

const Account = () => {
  const data = useAccount();

  const createAccountModal = async () => {
    const res = (await accountModal()) as {
      title: string;
      description: string;
    };
    if (res) {
      upsertAcount({ ...res, id: uuidv4() });
    }
  };
  return (
    <main className="flex flex-col h-screen p-5 bg-gray-50 bg-gradient-to-tr ">
      <h3>Bonjour {store.user()?.email}</h3>
      <button className="btn-primary" onClick={createAccountModal}>
        oljojo
      </button>
      <div className="container mx-auto grid lg:grid-cols-3 sm:grid-cols-1 gap-3 align-top justify-start place-content-start">
        {data?.map((d) => (
          <AccountCard {...d} />
        ))}
      </div>
    </main>
  );
};

export default Account;
