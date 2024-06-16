import { ClassNamesConfig, GroupBase } from "react-select";

// import { Select } from "../Select/Select";

export const defaultSelectStyles: ClassNamesConfig<
  unknown,
  boolean,
  GroupBase<unknown>
> = {
  control: (state) =>
    `dark:bg-primary-800 min-h-[37.33px] px-3 py-1 bg-white border dark:border-primary-600  rounded outline-primary-500 ${
      state.isFocused ? "border-primary-500 ring-2 ring-primary-500" : ""
    }`,
  menu: () =>
    "bg-white dark:bg-primary-800 border dark:border-primary-600 rounded mt-1 shadow",
  option: (state) =>
    ` px-4 py-2 cursor-pointer ${
      state.isSelected ? "bg-primary-500 text-white" : ""
    } ${
      state.isFocused && !state.isSelected
        ? "bg-gray-200 dark:bg-primary-800"
        : ""
    }`,
  multiValue: () =>
    "bg-primary-100 dark:bg-primary-600 m-1  text-primary-800 dark:text-primary-100 rounded px-2",
  multiValueLabel: () => "text-primary-800 dark:text-primary-100",
  multiValueRemove: () =>
    "cursor-pointer hover:bg-primary-500 hover:text-white rounded",
};

export const compactSelectStyles: ClassNamesConfig<
  unknown,
  boolean,
  GroupBase<unknown>
> = {
  control() {
    return `dark:bg-transparent dark:text-primary-50 px-1 rounded bg-white`;
  },
  menu() {
    return "bg-white dark:bg-primary-700 border dark:border-primary-600 rounded mt-1";
  },
  option(props) {
    return ` px-2 py-1 cursor-pointer ${
      props.isSelected ? "bg-primary-500 text-white" : ""
    } ${
      props.isFocused && !props.isSelected
        ? "bg-gray-200 dark:bg-primary-800"
        : ""
    }`;
  },
  clearIndicator(props) {
    return `cursor-pointer ${
      props.isFocused ? "text-primary-500" : "text-primary-300"
    }`;
  },
  multiValue() {
    return "bg-primary-100 dark:bg-primary-600 m-1  text-primary-700 dark:text-primary-100 rounded px-2";
  },
  multiValueLabel() {
    return "text-primary-700 dark:text-primary-100";
  },
  multiValueRemove() {
    return "cursor-pointer hover:bg-primary-500 hover:text-white rounded";
  },
};
