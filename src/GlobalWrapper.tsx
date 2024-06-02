import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ModalManager } from "./Modal/modal.ctx";
import { ThemeProvider } from "./store.tsx/theme.ctx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

const GlobalWrapper = () => {
  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ModalManager>
            <Outlet />
          </ModalManager>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default GlobalWrapper;
