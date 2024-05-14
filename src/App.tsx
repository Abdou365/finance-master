import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Account from "./Account/Account";
import "./App.css";
import Activity from "./Budget/Activity/Activity";
import Budget from "./Budget/Budget";
import DashBoard from "./Budget/DashBoard/DashBoard";
import Objectif from "./Budget/Objectif/Objectif";
import Login from "./Login/Login";
import { ModalManager } from "./Modal/modal.ctx";
import ProtectedRoute from "./route/ProtectedRoute";

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
          { path: ":accountId/objectif", Component: Objectif },
        ],
      },
      { path: "/", Component: Account },
    ],
  },
  { path: "/auth", Component: Login },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

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
