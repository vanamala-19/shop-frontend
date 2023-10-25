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
  const { getuser } = UserService();

  document.title = "SHOP | USER";

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await getuser();
        setUser(response.data);
      } catch (err) {
        if (err.response?.status !== 404) {
          setError("Failed to fetch user data");
        }
      } finally {
        setLoading(false);
      }
    };
    getUser();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      {user ? (
        <div className=" shadow-lg rounded-lg overflow-hidden w-full max-w-md p-6">
          <div className="flex flex-col items-center">
            {user?.image || !changeImg ? (
              <img
                src={`data:image/jpeg;base64,${user?.image}`}
                alt="user pic"
                className="w-32 h-32 bg-gray-300 rounded-full mb-4"
              />
            ) : (
              <ImageUpload />
            )}
            <button
              // eslint-disable-next-line no-undef
              onClick={() => setChangeImg(!changeImg)}
              className={`btn-${theme} px-2 py-1 text-xs rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2`}>
              Change Profile Picture
            </button>
          </div>
          <div className={`mt-6 text-${theme}`}>
            <h2 className="font-semibold text-center text-lg mb-4">
              User Details
            </h2>
            <div className={` text-${theme} space-y-2 text-gray-600`}>
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
          <div className="mt-6 flex space-x-2">
            <button onClick={user} className={`btn-${theme} py-2 px-4 rounded`}>
              Change Username
            </button>
            <button onClick={user} className={`btn-${theme} py-2 px-4 rounded`}>
              Change Password
            </button>
          </div>
        </div>
      ) : (
        <AddUser />
      )}
    </div>
  );
};

export default UserPage;
