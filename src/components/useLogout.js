import { axiosPrivate } from "../api/axios";
import useAuth from "../Hooks/useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    localStorage.setItem("user", "");
    try {
      //eslint-disable-next-line
      const response = await axiosPrivate.get("/auth/logout");
    } catch (err) {
      //   console.error(err);
    }
  };

  return logout;
};

export default useLogout;
