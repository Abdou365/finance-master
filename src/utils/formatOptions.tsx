export const formatOptions = (
  options: { label: string; value: any }[] | string[]
) => {
  return options.map((option: any) => {
    if (typeof option === "string") {
      return {
        label: option,
        value: option,
      };
    }
    return option;
  });
};
