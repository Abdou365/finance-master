import { difference } from "lodash";
import { useEffect, useState } from "react";
import {
  useBeforeUnload,
  useParams,
  useSearchParams,
  useBlocker,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ItemType } from "../types/item.type";
import { ItemCtx } from "./store.ctx";
import { upsertItems, useGetItems } from "./useItems";
import store from "./store";

const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const { accountId = "" } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "";

  const { data, refetch } = useGetItems(accountId, +page);

  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    if (data) {
      setItems(data.items);
    }
  }, [data]);

  const updateItems = (item: ItemType) => {
    const newItem = items.map((i) => {
      if (i.id === item.id) {
        return item;
      }
      return i;
    });
    setItems(newItem);
  };

  const createItems = (
    item: Omit<
      ItemType,
      "id" | "createdAt" | "userId" | "accountId" | "updatedAt"
    >
  ) => {
    setItems((prev) => [
      {
        ...item,
        id: uuidv4(),
        category: "",
        status: "published",
        createdAt: new Date().toISOString(),
        userId: store.user()?.id ?? "",
        accountId,
      },
      ...prev,
    ]);
  };

  const save = async () => {
    const editedItems = difference(items, data?.items);

    const res = await upsertItems(editedItems);
    if (res.status === 201) {
      refetch();
    }
  };

  const bulkDelete = (ids: string[]) => {
    const newItem = items.map((i) => {
      if (ids.includes(i.id)) {
        return { ...i, status: "deleted" } as ItemType;
      }
      return i;
    });

    setItems(newItem);
  };

  const deleteItem = (id: string) => {
    const newItem = items.map((i) => {
      if (i.id === id) {
        return { ...i, status: "deleted" } as ItemType;
      }
      return i;
    });
    setItems(newItem);
  };

  useBeforeUnload(() => {
    const editedItems = difference(items, data?.items);
    if (editedItems.length > 0) {
      save();
    }
  });

  useBlocker(() => {
    const editedItems = difference(items, data?.items);
    console.log(editedItems);
    if (editedItems.length > 0) {
      save();
    }
  });

  return (
    <ItemCtx.Provider
      value={{
        items: items.filter((item) => item.status === "published"),
        count: data?.count || 0,
        pageCount: data?.pageCount || 0,
        updateItems,
        createItems,
        refetch,
        bulkDelete,
        save,
        deleteItem,
      }}
    >
      {children}
    </ItemCtx.Provider>
  );
};

export default ItemsProvider;
