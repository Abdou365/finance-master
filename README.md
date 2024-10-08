# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Run the project :

npm run dev

## All Package

```json
"allPackage": {
"dependencies": {
"@headlessui/react": "^1.7.19",
"@popperjs/core": "^2.11.8",
"@rjsf/core": "^5.18.3",
"@rjsf/utils": "^5.18.3",
"@rjsf/validator-ajv8": "^5.18.3",
"@supabase/supabase-js": "^2.42.5",
"@tanstack/match-sorter-utils": "^8.15.1",
"@tanstack/react-query": "^5.29.2",
"@tanstack/react-table": "^8.16.0",
"axios": "^1.6.8",
"bem-ts": "^0.14.0",
"date-fns": "^3.6.0",
"date-fns-tz": "^3.1.3",
"lodash": "^4.17.21",
"react": "^18.2.0",
"react-datepicker": "^6.9.0",
"react-dom": "^18.2.0",
"react-hook-form": "^7.51.4",
"react-icons": "^5.2.0",
"react-paginate": "^8.2.0",
"react-popper": "^2.3.0",
"react-router-dom": "^6.22.3",
"react-select": "^5.8.0",
"react-textarea-autosize": "^8.5.3",
"recharts": "^2.12.6",
"sass": "^1.75.0",
"tailwind-merge": "^2.3.0",
"uuid": "^9.0.1"
},
"devDependencies": {
"@tanstack/eslint-plugin-query": "^5.28.11",
"@testing-library/react": "^15.0.2",
"@types/jest": "^29.5.12",
"@types/lodash": "^4.17.0",
"@types/react": "^18.2.66",
"@types/react-datepicker": "^6.2.0",
"@types/react-dom": "^18.2.22",
"@types/uuid": "^9.0.8",
"@typescript-eslint/eslint-plugin": "^7.2.0",
"@typescript-eslint/parser": "^7.2.0",
"@vitejs/plugin-react": "^4.2.1",
"autoprefixer": "^10.4.19",
"eslint": "^8.57.0",
"eslint-plugin-react-hooks": "^4.6.0",
"eslint-plugin-react-refresh": "^0.4.6",
"jest": "^29.7.0",
"postcss": "^8.4.38",
"tailwindcss": "^3.4.3",
"ts-jest": "^29.1.2",
"typescript": "^5.2.2",
"vite": "^5.2.0"
}
}
```
