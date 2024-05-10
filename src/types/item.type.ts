export type ItemType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  userId: string;
  accountId: string;
  value: number;
  projectedValue?: number;
  category: string;
  isExpense: boolean;
  status: "published" | "deleted";
  date: string;
};
