import { useState, useEffect } from "react";
import UserService from "../api/UserService";
import Adduser from "./AddUser";
import ImageUpload from "./ImageUpload";
const UserPage = () => {
  const [user, setUser] = useState();
  const { getuser } = UserService();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getuser();
        setUser(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {user ? (
        <div className="bg-gray-100 flex justify-evenly items-center flex-wrap h-full">
          <div className="flex justify-between items-center">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="mt-6 flex flex-wrap gap-4  flex-col">
                {user?.image ? (
                  <img
                    src={`data:image/jpeg;base64,${user?.image}`}
                    alt="user pic"
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  />
                ) : (
                  <ImageUpload />
                )}
                {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href="#"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  change username
                </a>
                {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href="#"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  change password
                </a>
              </div>
              <hr className="my-6 border-t border-gray-300" />
            </div>
          </div>
          <div className="col-span-4 sm:col-span-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="font-semibold text-center mt-3 -mb-2 text-black my-4 py-5">
                User Details
              </h2>
              <div className="mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-bold">Name : </span>
                  <p>
                    <span className="text-gray-600 justify-start">
                      {user?.name}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-bold">Email : </span>
                  <p>
                    <span className="text-gray-600 mr-2">{user?.email}</span>
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-bold">Phone : </span>
                  <p>
                    <span className="text-gray-600 mr-2">{user?.phone}</span>
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-bold">Adress : </span>
                  <p>
                    <span className="text-gray-600 mr-2">{user?.address}</span>
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-bold">username : </span>
                  <p>
                    <span className="text-gray-600 mr-2">{user?.username}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Adduser />
      )}
    </>
  );
};

export default UserPage;
