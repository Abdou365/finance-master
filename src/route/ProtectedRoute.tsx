import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

const ProtectedRoute = () => {
  const params = useParams();

  useEffect(() => {
    const login = localStorage.getItem("login");
    console.log("Champion");

    if (!login) {
      window.location.replace("/auth");
    }
  }, [params]);

  return <Outlet />;
};

export default ProtectedRoute;
