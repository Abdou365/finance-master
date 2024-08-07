import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ModalManager } from "./components/Modal/modal.ctx";
import { ThemeProvider } from "./store.tsx/theme.ctx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import LoadingProvider from "./Loading/Loading";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

const GlobalWrapper = () => {
  return (
    <>
      <LoadingProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <ModalManager>
              <ToastContainer
                toastClassName={
                  "p-4 rounded shadow-lg bg-white text-black dark:bg-primary-800 dark:text-white border dark:border-primary-600"
                }
                theme="light"
                stacked
              />
              <Outlet />
            </ModalManager>
          </QueryClientProvider>
        </ThemeProvider>
      </LoadingProvider>
    </>
  );
};

export default GlobalWrapper;
