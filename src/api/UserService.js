import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const UserService = () => {
  const axiosPrivate = useAxiosPrivate();
  const username = localStorage.getItem("user");

  const getuser = async () => {
    const res = await axiosPrivate.get("/user/", {
      params: { username: JSON.parse(username) },
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  };

  const getImage = () => {
    return axiosPrivate.post(
      "/user/profile",
      { username: JSON.parse(username) },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  };

  const getAllUsers = () => {
    return axiosPrivate.get("/admin/users/", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  };

  const updateUsername = (user) => {
    return axiosPrivate.post(
      "/user/usernameUpdate",
      { username: JSON.parse(username), password: user },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  };

  return { getuser, getAllUsers, getImage, updateUsername };
};

export default UserService;
