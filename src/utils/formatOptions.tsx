export const formatOptions = (
  options: { name: string; value: any }[] | string[]
) => {
  return options.map((option: any) => {
    if (typeof option === "string") {
      return {
        name: option,
        value: option,
      };
    }
    return option;
  });
};
