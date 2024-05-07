export type ItemType = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  value: number;
  projectedValue?: number;
  category: string;
  isExpense: boolean;
  status: "published" | "deleted";
};
