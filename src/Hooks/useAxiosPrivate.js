import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    console.log("request with auth is ")
    console.log(auth)
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.eject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.error(error);
        const prevRequest = error?.config;
        if (error?.response.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAcessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAcessToken}`;

          console.log("response sucess with auth is "+newAcessToken+" and auth is ");
          console.log(auth)
          return axiosPrivate(prevRequest);
          
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
