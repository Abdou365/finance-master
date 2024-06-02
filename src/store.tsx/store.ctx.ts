/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";
import { ItemType } from "../types/item.type";

export type StoreFilterType = {
  view: string;
  date: string | null;
};

export type StoreType = {
  defaultItem: ItemType[];
  items: ItemType[];
  categories: string[];
  filter: StoreFilterType;
  count: number;
  pageCount: number;
  updateFilter: (string: string) => void;
  updateItems: (item: ItemType) => void;
  createItems: (item: Omit<ItemType, "id" | "updatedAt" | "createdAt">) => void;
  deleteItem: (id: string) => void;
  deleteSelectedItems: () => void;
  save: () => void;
  selectedItem: string[];
  selectItem: (id: string) => void;
};

export const initialState: StoreType = {
  defaultItem: [],
  items: [],
  categories: [],
  filter: { view: "All", date: null },
  count: 0,
  pageCount: 0,
  updateFilter: function (_string) {},
  updateItems: function (_item: ItemType) {},
  createItems: function (_item: ItemType) {},
  deleteSelectedItems: function () {},
  save: function (): void {},
  selectedItem: [],
  selectItem: function (_id: string) {},
  deleteItem: function (_id: string): void {},
};

export const ItemCtx = createContext(initialState);

export const useItems = () => useContext(ItemCtx);
