import { slice } from "lodash";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { accountModal } from "../Modal/AccountModal";
import Button from "../components/Button/Button";
import NavBar from "../components/NavBar/NavBar";
import Pagination from "../components/Pagination/Pagination";
import store from "../store.tsx/store";
import { upsertAcount, useAccount } from "../store.tsx/useAccount";
import { formatNumber } from "../utils/rounding";
import { AccountCard } from "./AccountCard";

const Account = () => {
  const data = useAccount();
  const [viewIndex, setViewIndex] = useState(0);
  const navigate = useNavigate();

  const createAccountModal = async () => {
    const res = (await accountModal()) as unknown;
    if (res) {
      const upsert = await upsertAcount({ ...res, id: uuidv4() });

      if (upsert.statusCode === 201) {
        navigate(`/app/${upsert.data.id}`);
      }
    }
  };

  const globalBalance = data?.reduce((acc, curr) => acc + curr.balance, 0);
  const globalExpense = data?.reduce((acc, curr) => acc + curr.expenseSum, 0);
  const globalIncome = data?.reduce((acc, curr) => acc + curr.paymentSum, 0);
  const totalCount = data?.reduce((acc, curr) => acc + curr.itemCount, 0);
  const totalAccount = data?.length;

  const indicators = [
    {
      title: "Balance",
      value: globalBalance,
      as: "money",
    },
    {
      title: "Expense",
      value: globalExpense,
      as: "money",
    },
    {
      title: "Income",
      value: globalIncome,
      as: "money",
    },
    {
      title: "Total Item",
      value: totalCount,
      as: "number",
    },
    {
      title: "Account",
      value: totalAccount,
      as: "number",
    },
  ];

  const currebtData = slice(data, viewIndex * 6, viewIndex * 6 + 6);

  return (
    <>
      <NavBar />
      <main className="flex flex-col h-screen p-5 bg-gradient-to-tr container items-center m-auto gap-10">
        <h3 className=" text-4xl font-medium text-center">
          <p>Bonjour</p> <p className=" break-all">{store.user()?.email}</p>
        </h3>
        <div className=" flex gap-10 flex-wrap justify-center">
          {indicators.map((ind) => (
            <div>
              <p className="text-center">{ind.title}</p>
              <p className="text-5xl flex">
                {ind.as === "money"
                  ? formatNumber({ number: ind.value || 0 })
                  : ind.value}
                {ind.as === "money" && (
                  <span className="text-base font-semibold">€</span>
                )}
              </p>
            </div>
          ))}
        </div>
        <Button size="large" onClick={createAccountModal}>
          <FaPlusCircle /> Create new Item
        </Button>
        <div>
          <Pagination
            currentPage={viewIndex}
            totalPages={data?.length / 6}
            onPageChange={setViewIndex}
          />
        </div>
        <div className="container mx-auto grid lg:grid-cols-3 sm:grid-cols-1 gap-3 align-top justify-start place-content-start">
          {currebtData?.map((d) => (
            <AccountCard {...d} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Account;
