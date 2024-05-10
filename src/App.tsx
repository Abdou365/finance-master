import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Budget from "./Budget/Budget";
import Login from "./Login/Login";
import ItemsProvider from "./store.tsx/ItemsProvider";
import DashBoard from "./Budget/DashBoard/DashBoard";
import Activity from "./Budget/Activity/Activity";
import { ModalManager } from "./Modal/modal.ctx";
import ProtectedRoute from "./route/ProtectedRoute";
import Account from "./Account/Account";

const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        path: "/app",
        Component: Budget,
        children: [
          { path: ":accountId", Component: DashBoard },
          { path: ":accountId/activity", Component: Activity },
        ],
      },
      { path: "/account", Component: Account },
    ],
  },
  { path: "/auth", Component: Login },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ModalManager>
          <RouterProvider router={router}></RouterProvider>
        </ModalManager>
      </QueryClientProvider>
    </>
  );
}

export default App;
