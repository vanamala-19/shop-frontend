import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const UserService = () => {
  const axiosPrivate = useAxiosPrivate();
  const username = localStorage.getItem("user");

  const getuser = () => {
    return axiosPrivate.get(
      "/user/",
      { params: { username: JSON.parse(username) } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
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
    return axiosPrivate.get("/admin/", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  };

  return { getuser, getAllUsers, getImage };
};

export default UserService;
