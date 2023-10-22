import { useState, useEffect } from "react";
import UserService from "../api/UserService";
import AddUser from "./AddUser";
import ImageUpload from "./ImageUpload";
import LoadingPage from "./Loading";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [changeImg, setChangeImg] = useState(false);
  const { getuser } = UserService();

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await getuser();
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      {user ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md p-6">
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
              className="bg-blue-500 text-white px-2 py-1 text-xs rounded cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2">
              Change Profile Picture
            </button>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold text-center text-lg mb-4">
              User Details
            </h2>
            <div className="space-y-2 text-gray-600">
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
            <button
              onClick={""}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Change Username
            </button>
            <button
              onClick={""}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
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
