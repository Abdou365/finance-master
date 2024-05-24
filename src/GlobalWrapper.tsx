import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ModalManager } from "./Modal/modal.ctx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

const GlobalWrapper = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ModalManager>
          <Outlet />
        </ModalManager>
      </QueryClientProvider>
    </>
  );
};

export default GlobalWrapper;
