export const formatOptions = (
  options: { label: string; value: unknown }[] | string[]
) => {
  return options.map((option: unknown) => {
    if (typeof option === "string") {
      return {
        label: option,
        value: option,
      };
    }
    return option;
  });
};
