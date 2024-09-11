import { FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BoxComponent from "../components/Box/BoxComponent";
import Button from "../components/Button/Button";
import { AccountType } from "../types/account.type";

interface AccountCardType extends AccountType {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AccountCard = (props: AccountCardType) => {
  const nav = useNavigate();
  const { onEdit, onDelete, ...account } = props;
  return (
    <BoxComponent size="medium" className="relative overflow-hidden">
      <div className="relative h-full w-full space-y-3">
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <span className=" uppercase font-bold">solde </span>
            <span className=" text-2xl font-bold">{props.balance} €</span>
          </div>
          <div className="flex items-start gap-1">
            <Button onClick={() => onEdit(account.id)}>
              <FaEdit />
            </Button>
            <Button color="red" onClick={() => onDelete(account.id)}>
              <FaTrash />
            </Button>
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
        <Button
          variant="link"
          onClick={() => {
            nav(`/app/${props.id}`, { relative: "route" });
          }}
        >
          <span className="m-auto">Consulter</span>
          <FaArrowRight className=" m-auto" size={12} />
        </Button>
      </div>
    </BoxComponent>
  );
};
