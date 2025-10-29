import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth"; // custom hook to get/set auth tokens
import useRefreshToken from "../Hooks/useRefreshToken";
import LoadingPage from "./Loading";

const PersistLogin = () => {
  const [isReady, setIsReady] = useState(false);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log(auth);
        if (!auth?.accessToken) {
          await refresh(); // refresh token if accessToken missing
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
      } finally {
        setIsReady(true);
      }
    };

    verifyToken();
  }, [auth, refresh]);

  if (!isReady) return <LoadingPage />;

  return <Outlet />; // render child routes after token is ready
};

export default PersistLogin;
