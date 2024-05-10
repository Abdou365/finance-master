import { difference, sortBy, uniq } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ItemType } from "../types/item.type";
import { ItemCtx, useItems } from "./store.ctx";
import { upsertItems, useGetItems } from "./useItems";
import { useParams } from "react-router-dom";

const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const { accountId } = useParams();

  const { data, refetch } = useGetItems(accountId);
  const [items, setItems] = useState<ItemType[]>([]);
  const [filter, setFilter] = useState({ view: "All", date: null });
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const { defaultItem } = useItems();
  const categories = useMemo(
    () => ["All", ...uniq(items?.map((item) => item?.category))],
    [items]
  );

  const updateFilter = (view: string) => {
    setFilter((prev) => ({
      ...prev,
      view,
    }));
  };

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
      { ...item, id: uuidv4(), category: filter.view },
      ...prev,
    ]);
  };

  const deleteItem = (id: string) => {
    const newItem = items
      .map((i) => {
        if (i.id === id) {
          return { ...i, status: "deleted" } as ItemType;
        }
        return i;
      })
      .filter((item) => item.status === "published");
    console.log(newItem);
    setItems(newItem);
  };
  const deleteSelectedItems = () => {
    const newItem = items
      .map((i) => {
        if (selectedItem.includes(i.id)) {
          return { ...i, status: "deleted" } as ItemType;
        }
        return i;
      })
      .filter((item) => item.status === "published");
    console.log(newItem);
    setItems(newItem);
  };

  useEffect(() => {
    setItems(sortBy(data!, "created_at"));
  }, [data]);

  const displayedItem = useMemo(() => {
    if (filter.view === "All") {
      return items.filter((item) => item.status === "published");
    }

    return items.filter(
      (item) => item.status === "published" && item.category === filter.view
    );
  }, [filter.view, items]);

  const save = async () => {
    const editedItems = difference(items, data!);
    console.log(defaultItem);
    const res = await upsertItems(editedItems);
    if (res.status === 200) {
      refetch();
    }
  };

  const selectItem = (id: string) => {
    if (selectedItem.includes(id)) {
      setSelectedItem((prev) => [...prev.filter((p) => p !== id)]);
    } else {
      setSelectedItem((prev) => [id, ...prev]);
    }
  };

  return (
    <ItemCtx.Provider
      value={{
        items: displayedItem || [],
        defaultItem: data || [],
        categories,
        filter,
        selectedItem,
        selectItem,
        updateFilter,
        updateItems,
        createItems,
        deleteSelectedItems,
        deleteItem,
        save,
      }}
    >
      {children}
    </ItemCtx.Provider>
  );
};

export default ItemsProvider;
