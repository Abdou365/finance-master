import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AccountType } from "../types/account.type";

export const AccountCard = (props: AccountType) => {
  const nav = useNavigate();
  return (
    <div className="rounded relative  border dark:border-primary-600 p-5 overflow-hidden">
      <div className="absolute h-full w-full bg-white dark:bg-primary-900 top-0 left-0 blur-2xl">
        {/* <div className="h-24 w-24 ml-auto bg-secondary-300 dark:bg-secondary-700"></div> */}
      </div>
      <div className="relative h-full w-full   space-y-3">
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <span className=" uppercase font-bold">solde </span>
            <span className=" text-2xl font-bold">{props.balance} €</span>
          </div>
        </div>
        <h3 className=" font-bold text-gray-800 dark:text-white text-xl">
          {props.title}
        </h3>
        <p className=" text-gray-600 dark:text-primary-100 text-sm line-clamp-2">
          {props.description}
        </p>
        <hr className=" dark:border-primary-600 border border-gray-200" />
        <table className=" w-full rounded text-sm  text-gray-600 dark:text-primary-100 ">
          <tbody>
            <tr>
              <td className="px-2">Dépense</td>
              <td className="text-right px-2">{props.expenseCount}</td>
            </tr>
            <tr>
              <td className="px-2">Somme des dépense</td>
              <td className="text-right px-2">{props.expenseSum} €</td>
            </tr>
            <tr>
              <td className="px-2">Dépense</td>
              <td className="text-right px-2">{props.paymentCount}</td>
            </tr>
            <tr>
              <td className="px-2">Dépense</td>
              <td className="text-right px-2">{props.paymentSum} €</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() => {
            nav(`/app/${props.id}`, { relative: "route" });
          }}
          className="btn-primary-link flex align-middle gap-2"
        >
          <span className="m-auto">Modifier</span>
          <FaArrowRight className=" m-auto" size={12} />
        </button>
      </div>
    </div>
  );
};
