import resolveConfig from "tailwindcss/resolveConfig";
import myConfig from "../../tailwind.config";

export const tailwindConfig = resolveConfig({ ...myConfig });
export const theme = tailwindConfig.theme;
