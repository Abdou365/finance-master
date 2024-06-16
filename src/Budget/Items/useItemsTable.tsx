import { TableColumnType } from "../../components/Table/Table";
import { defaultCategory, useGetItemsCategory } from "../../store.tsx/useItems";
import { formatOptions } from "../../utils/formatOptions";

export const useItemsTable = () => {
  const { data: options } = useGetItemsCategory();

  const tableColumns: TableColumnType[] = [
    {
      name: "date",
      label: "Date de mise En effet",
      type: "date",
      dtatype: "date",
      size: 70,
    },
    {
      name: "category",
      label: "Caetegory",
      type: "select",
      options: formatOptions(
        [...(options || []), ...defaultCategory].map((option) =>
          typeof option === "string" ? option : option.value
        )
      ),
      dtatype: "string",
      creatable: true,
      size: 50,
    },
    {
      name: "title",
      label: "Titre",
      type: "text",
      dtatype: "string",
    },
    {
      name: "isExpense",
      label: "nature",
      type: "select",
      dtatype: "boolean",
      options: [
        { label: "dépense", value: true },
        { label: "encaissement", value: false },
      ],
      size: 50,
    },

    {
      name: "value",
      label: "Montant",
      type: "number",
      dtatype: "integer",
      size: 80,
    },
  ];

  return { columns: tableColumns };
};
