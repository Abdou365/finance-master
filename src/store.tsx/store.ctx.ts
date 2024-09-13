/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";
import { ItemType } from "../types/item.type";

export type StoreFilterType = {
  view: string;
  date: string | null;
};

export type StoreType = {
  items: ItemType[];
  count: number;
  pageCount: number;
  updateItems: (item: ItemType) => void;
  createItems: (item: Omit<ItemType, "id" | "updatedAt" | "createdAt">) => void;
  deleteItem: (id: string) => void;
  bulkDelete: (ids: string[]) => void;
  save: () => void;
  refetch: () => void;
};

export const initialState: StoreType = {
  items: [],
  count: 0,
  pageCount: 0,
  updateItems: function (_item: ItemType) {},
  createItems: function (_item: Partial<ItemType>) {},
  save: function (): void {},
  refetch: function (): void {},
  bulkDelete: function (_ids: string[]) {},
  deleteItem: function (_id: string): void {},
};

export const ItemCtx = createContext(initialState);

export const useItemsStore = () => useContext(ItemCtx);
