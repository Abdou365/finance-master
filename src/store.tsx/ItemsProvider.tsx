import { difference } from "lodash";
import { useEffect, useState } from "react";
import {
  useBeforeUnload,
  useBlocker,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { ItemType } from "../types/item.type";
import store from "./store";
import { ItemCtx } from "./store.ctx";
import { upsertItems, useGetItems } from "./useItems";

const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const { accountId = "" } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "";
  const isFreeUser = store.isFreeUser();
  const [hasChanged, setHasChanged] = useState(false);

  const { data, refetch } = useGetItems(accountId, +page);

  const [items, setItems] = useState<ItemType[]>([]);

  const publishedItems = items.filter((item) => item.status === "published");

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
    setHasChanged(true);
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
        status: "published",
        createdAt: new Date().toISOString(),
        userId: store.user()?.id ?? "",
        accountId,
      },
      ...prev,
    ]);
  };

  const save = async () => {
    if (isFreeUser && items.length > 100) {
      toast.error(
        "You have reached the maximum number of items for the free plan"
      );
      return;
    }
    if (data) {
      const editedItems = difference(items, data?.items);
      await upsertItems(editedItems, publishedItems.length);
      setHasChanged(false);
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

  useBlocker(() => {
    if (hasChanged) {
      const confirm = window.confirm(
        "Vous avez des modifications non enregistrées. Voulez-vous quittez la page?"
      );

      if (confirm) {
        return false;
      }

      return true;
    }
    return false;
  });

  return (
    <ItemCtx.Provider
      value={{
        items: publishedItems,
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
