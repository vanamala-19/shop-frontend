import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth,auth } = useAuth();

  const refresh = async () => {
    console.log("called")
    console.log(auth)
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
    console.log(accessToken+"new")
    console.log(response.data+"next")
    return response.data;
  };
  return refresh;
};

export default useRefreshToken;
