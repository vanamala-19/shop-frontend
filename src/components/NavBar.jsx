import React, { useEffect, useState } from "react";
import UserService from "../api/UserService";
import useLogout from "./useLogout";
import { PiShoppingCartFill } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useToggle from "../Hooks/useToggle";
import useAuth from "../Hooks/useAuth";
import ThemeSwitch from "../Hooks/ThemeSwitch";

const NavBar = ({ theme }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [check, toggleCheck] = useToggle("profile", false);
  const logout = useLogout();
  const signOut = async () => {
    const response = await logout;
    response();
    toggleCheck();
    navigate("/");
  };
  const user = () => {
    toggleCheck();
    navigate("/user");
  };
  const User = localStorage.getItem("user");
  const { getuser } = UserService();
  const [image, setImage] = useState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line
    const getImage = async () => {
      try {
        const response = await getuser();
        setImage(response?.data?.image);
      } catch (err) {
        console.error(err);
      }
    };
    // getImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={theme}>
      <nav
        className={`bg-${
          theme === "light" ? "white" : "gray-900"
        } p-4 text-white flex flex-wrap items-center justify-between`}>
        <div className="flex items-center">
          {/* eslint-disable-next-line */}
          <a
            className="flex items-center text-white"
            onClick={() => navigate("/")}>
            <PiShoppingCartFill />
            SHOP
          </a>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {/* Current: "bg-blue-900 text-white", Default: "text-blue-300 hover:bg-blue-700 hover:text-white" */}
              <a
                href="/"
                className="hover:bg-gray-700 active:bg-gray-600 text-white rounded-md px-3 py-2 text-sm font-medium"
                aria-current="page">
                Home
              </a>
              {/* eslint-disable-next-line */}
              <a
                onClick={() => navigate("/cart")}
                className="hover:cursor-pointer text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white rounded-md px-3 py-2 text-sm font-medium">
                Cart
              </a>
              {/* eslint-disable-next-line */}
              <a
                onClick={() => navigate("/orders")}
                className="hover:cursor-pointer text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white rounded-md px-3 py-2 text-sm font-medium">
                Orders
              </a>
              {user && JSON.stringify(User).match("admin") && auth && (
                <>
                  {/* eslint-disable-next-line */}
                  <a
                    onClick={() => navigate("/admin")}
                    className="hover:cursor-pointer text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white rounded-md px-3 py-2 text-sm font-medium">
                    Admin
                  </a>

                  {/* eslint-disable-next-line */}
                  <a
                    href="#"
                    className="hover:cursor-pointer text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white rounded-md px-3 py-2 text-sm font-medium">
                    Product
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <ThemeSwitch />
          {/* Profile dropdown */}
          <div className="relative ml-3">
            <div>
              <button
                type="button"
                onClick={toggleCheck}
                className="p-0 rounded-full bg-blue-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                {image ? (
                  <img
                    className=" w-10 h-10 rounded-full"
                    src={`data:image/jpeg;base64,${image}`}
                    alt="user pic"
                  />
                ) : (
                  <FaUserAlt />
                )}
              </button>
            </div>

            {check && (
              <div
                id="dropdown"
                className=" absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1">
                <ul>
                  <li>
                    {/* eslint-disable-next-line */}
                    <a
                      onClick={user}
                      className="block px-4 py-2 text-sm text-blue-700 hover:cursor-pointer"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0">
                      Your Profile
                    </a>
                  </li>
                  <li>
                    {/* eslint-disable-next-line */}
                    <a
                      onClick={signOut}
                      className="block px-4 py-2 text-sm text-blue-700 hover:cursor-pointer"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-1">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
