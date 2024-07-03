import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Account from "./Account/Account";
import "./App.css";
import Activity from "./Budget/Activity/Activity";
import Budget from "./Budget/Budget";
import DashBoard from "./Budget/DashBoard/DashBoard";
import Objectif from "./Budget/Objectif/Objectif";
import GlobalWrapper from "./GlobalWrapper";
import Login from "./Login/Login";
import ProtectedRoute from "./route/ProtectedRoute";
import NotFoundScreen from "./components/404/404";

const router = createBrowserRouter([
  {
    path: "/",
    Component: GlobalWrapper,
    children: [
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
    ],
  },
  {
    path: "*",
    Component: NotFoundScreen,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
