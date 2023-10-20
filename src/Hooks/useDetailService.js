import useAxiosPrivate from "./useAxiosPrivate";

const useDetailService = () => {
  const axiosPrivate = useAxiosPrivate();
  const getuser = async (username) => {
    try {
      const response = await axiosPrivate.post(
        "/user/",
        { username: username },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };
  return getuser;
};

export default useDetailService;
