import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    localStorage.setItem("profile", false);
    const response = await axios.get("/auth/refresh", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    setAuth(() => {
      return {
        accessToken: response.data,
      };
    });

    return response.data;
  };
  return refresh;
};

export default useRefreshToken;
