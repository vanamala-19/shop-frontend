import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import jwt_decode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  let decoded;
  try {
    if (auth?.accessToken && auth.accessToken !== "undefined") {
      decoded = jwt_decode(auth.accessToken);
    }
  } catch (err) {
    console.error("❌ Invalid token detected:", err);
    // Optional: clear bad token from localStorage or context
    localStorage.removeItem("user");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const roles = decoded?.roles || [];

  if (decoded?.sub) {
    localStorage.setItem("user", JSON.stringify(decoded.sub));
  }

  if (roles.some((role) => allowedRoles?.includes(role))) {
    return <Outlet />;
  }

  return auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
