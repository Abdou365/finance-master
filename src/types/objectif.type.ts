export interface ObjectifType {
  id: string;
  accountId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: null | string;
  from: null | string;
  to: null | string;
  deadline: null | string;
  targetAmount: number;
  categories: [];
  recurrence: null | string;
  recurrenceInterval: null | number;
  isRecurrent: boolean;
  customRecurrence: null | string;
  isCompleted: false;
  type: "savings" | "income";
  status: "active" | "deleted";
  currentAmount: number;
  progress: number;
}
