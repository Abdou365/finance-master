export const formatOptions = (
  options: { label: string; value: string | number }[] | string[]
) => {
  return options.map((option) => {
    if (typeof option === "string") {
      return {
        label: option,
        value: option,
      };
    }
    return option;
  });
};
