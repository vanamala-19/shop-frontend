import { useState, useEffect } from "react";
import UserService from "../api/UserService";
import AddUser from "./AddUser";
import ImageUpload from "./ImageUpload";
import LoadingPage from "./Loading";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const UserPage = () => {
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [changeImg, setChangeImg] = useState(false);
  // const [changeUsername, setChangeUsername] = useState(false);
  // const [newusername, setNewusername] = useState("");
  const { getuser } = UserService();

  document.title = "SHOP | USER";

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await getuser();
        setUser(response);
      } catch (err) {
        if (err.response?.status !== 404) {
          setError("Failed to fetch user data");
        }
      } finally {
        setLoading(false);
      }
    };
    getUser();
    //eslint-disable-next-line
  }, []);

  // const HandleUsernameChange = async () => {
  //   // console.log(newusername);
  //   // console.log(JSON.parse(localStorage.getItem("username")));
  //   const response = await updateUsername(newusername);
  //   console.log(response);
  //   setChangeUsername(false);
  // };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {user ? (
        <div className="shadow-lg rounded-lg w-full max-w-md p-6 overflow-hidden">
          <div className="flex flex-col items-center">
            {user?.image && !changeImg ? (
              <>
                <img
                  src={`data:image/jpeg;base64,${user?.image}`}
                  alt="user pic"
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4"
                />
                <button
                  onClick={() => setChangeImg(true)}
                  className={`btn-${theme} px-2 py-1 text-xs rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2`}>
                  Change Profile Picture
                </button>
              </>
            ) : (
              <ImageUpload />
            )}
          </div>
          <div className={`mt-6 text-${theme}`}>
            <h2 className="font-semibold text-center text-lg mb-4">
              User Details
            </h2>
            <div className={`space-y-2 text-gray-600 text-${theme}`}>
              <p className="flex justify-between">
                <span className="font-bold">Name:</span>
                {user?.name}
              </p>
              <p className="flex justify-between">
                <span className="font-bold">Email:</span>
                {user?.email}
              </p>
              <p className="flex justify-between">
                <span className="font-bold">Phone:</span>
                {user?.phone}
              </p>
              <p className="flex justify-between">
                <span className="font-bold">Address:</span>
                {user?.address}
              </p>
              <p className="flex justify-between">
                <span className="font-bold">Username:</span>
                {user?.username}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <AddUser />
      )}
    </div>
  );
};

export default UserPage;
