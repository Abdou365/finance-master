import { slice } from "lodash";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import BoxComponent from "../components/Box/BoxComponent";
import Button from "../components/Button/Button";
import ListComponent from "../components/List/ListComponent";
import ListItemComponent from "../components/List/ListItemComponent";
import { openConfirmModal } from "../components/Modal/ConfirModal";
import { formModal } from "../components/Modal/FormModal";
import Pagination from "../components/Pagination/Pagination";
import { useAccount } from "../store.tsx/useAccount";
import { AccountType } from "../types/account.type";
import { formatNumber } from "../utils/rounding";
import { AccountCard } from "./AccountCard";

const fields = [
  {
    type: "string",
    name: "title",
    label: "Non de l'entré",
    description: "The title of the form entry.",
  },
  {
    type: "string",
    format: "textarea",
    name: "description",
    label: "A detailed description of the form entry.",
  },
];

export const AccountList = () => {
  const { data, deleteAccount, upsertAcount } = useAccount();
  const [viewIndex, setViewIndex] = useState(0);

  const createAccountModal = async () => {
    const res = (await formModal({ fields })) as unknown;
    if (res) {
      const upsert = upsertAcount({ ...res, id: uuidv4() });
      console.log(upsert);
    }
  };

  const editAccountModal = async (id: string) => {
    const res = (await formModal({
      fields,
      data: data?.find((d) => d.id === id),
    })) as AccountType;

    if (res) {
      upsertAcount({
        title: res.title,
        description: res.description,
        id,
      });
    }
  };

  const handleDeleteAccount = async (id: string) => {
    const open = await openConfirmModal({
      message: "Voulez-vous vraiment supprimer ce compte ?",
    });
    if (open) {
      await deleteAccount({ id });
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

  const currentData = slice(data, viewIndex * 6, viewIndex * 6 + 6);

  return (
    <div className="flex flex-col mx-auto gap-4">
      <div className="flex justify-between">
        <div>
          {data && currentData.length > 6 && (
            <Pagination
              currentPage={viewIndex}
              totalPages={data?.length / 6}
              onPageChange={setViewIndex}
            />
          )}
        </div>
        <Button onClick={createAccountModal}>
          <FaPlusCircle /> Ajouter un nouveau compte
        </Button>
      </div>

      <div className="flex-1 flex sm:flex-row flex-col gap-3">
        <div className=" flex-1 grid lg:grid-cols-3 grid-cols-1 gap-3 align-top justify-start place-content-start">
          {currentData?.map((d) => (
            <AccountCard
              onEdit={editAccountModal}
              onDelete={handleDeleteAccount}
              {...d}
            />
          ))}
        </div>

        <BoxComponent className="sm:w-48 w-full max-w-full h-fit">
          <ListComponent celled title="Vos Compte">
            {indicators.map((ind) => (
              <ListItemComponent>
                <span>{ind.title}</span>
                <p className="flex text-xl font-bold">
                  {ind.as === "money"
                    ? formatNumber({ number: ind.value || 0 })
                    : ind.value}
                  {ind.as === "money" && (
                    <span className="text-base font-semibold">€</span>
                  )}
                </p>
              </ListItemComponent>
            ))}
          </ListComponent>
        </BoxComponent>
      </div>
    </div>
  );
};
