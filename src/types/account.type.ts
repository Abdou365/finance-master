import { ItemType } from "./item.type";

export interface AccountType {
  id: string;
  title: string;
  description: string;
  userId: string | null;
  itemCount: number;
  expenseCount: number;
  paymentCount: number;
  expenseSum: number;
  paymentSum: number;
  balance: number;
}

export interface AccountExpenseRepartition {
  name: string | null;
  value: number;
}

export interface AccountSummarize {
  sumPayment: number;
  sumExpense: number;
  balance: number;
}

export interface AccountDashboard
  extends Pick<AccountType, "id" | "userId" | "title"> {
  item: Pick<ItemType, "id" | "date" | "isExpense" | "category" | "value">[];
  expenseRepartition: AccountExpenseRepartition[];
  summarize: AccountSummarize;
  Item: {
    category: string;
    date: string;
    id: string;
    isExpense: boolean;
    title: string;
    value: number;
  }[];
  Objectif: {
    completed: number;
    opened: number;
    total: number;
    progress: number;
  };
}
