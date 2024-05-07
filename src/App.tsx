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
        path: "/",
        Component: Budget,
        children: [
          { path: "", Component: DashBoard },
          { path: "activity", Component: Activity },
        ],
      },
    ],
  },
  { path: "/auth", Component: Login },
  { path: "/account", Component: Account },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ItemsProvider>
          <ModalManager>
            <RouterProvider router={router}></RouterProvider>
          </ModalManager>
        </ItemsProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
