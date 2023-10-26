import React, { useEffect, useState } from "react";
import UserService from "../api/UserService";
import useLogout from "./useLogout";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useToggle from "../Hooks/useToggle";
import useAuth from "../Hooks/useAuth";
import ThemeSwitch from "../Hooks/ThemeSwitch";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
const NavBar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [check, toggleCheck] = useToggle("profile", false);
  const logout = useLogout();
  const { theme } = useContext(ThemeContext);

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
        setImage(response?.image);
      } catch (err) {
        console.error(err);
      }
    };
    getImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <nav className={`text-${theme} p-4 navbar mt-0 pt-0`}>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`text-${theme} relative inline-flex items-center justify-center rounded-md p-2  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu`}
                aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg
                    className=" h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex-1 items-center justify-center sm:items-stretch sm:justify-start hidden md:block">
              {/* eslint-disable-next-line */}
              <a
                onClick={() => navigate("/")}
                className="hover:cursor-pointer  focus:outline-none focus:ring-2 focus:ring-white rounded-md px-3 py-2 text-sm font-medium">
                Home
              </a>
              {/* eslint-disable-next-line */}
              <a
                onClick={() => navigate("/cart")}
                className="hover:cursor-pointer  focus:outline-none focus:ring-2 focus:ring-white rounded-md px-3 py-2 text-sm font-medium">
                Cart
              </a>
              {/* eslint-disable-next-line */}
              <a
                onClick={() => navigate("/orders")}
                className="hover:cursor-pointer   focus:outline-none focus:ring-2 focus:ring-white rounded-md px-3 py-2 text-sm font-medium">
                Orders
              </a>
              {user && JSON.stringify(User).match("admin") && auth && (
                <>
                  {/* eslint-disable-next-line */}
                  <a
                    onClick={() => navigate("/admin")}
                    className="hover:cursor-pointer  focus:outline-none focus:ring-2 focus:ring-white rounded-md px-3 py-2 text-sm font-medium">
                    Admin
                  </a>
                  {/* eslint-disable-next-line */}
                  <a
                    onClick={() => navigate("/product")}
                    className="hover:cursor-pointer  focus:outline-none focus:ring-2 focus:ring-white rounded-md px-3 py-2 text-sm font-medium">
                    Product
                  </a>
                </>
              )}
            </div>
            {/* </div>
            </div> */}

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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

                {/*
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          */}

                {check && (
                  <div
                    id="dropdown"
                    className="z-51 mt-0 pt-0 border-spacing-0 absolute right-0 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
          </div>
        </div>

        {/*  Mobile menu, show/hide based on menu state.  */}
        {isMobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* eslint-disable-next-line */}
              <a
                onClick={() => {
                  navigate("/");
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="  block rounded-md px-3 py-2 text-base font-medium"
                aria-current="page">
                Home
              </a>
              {/* eslint-disable-next-line */}
              <a
                onClick={() => {
                  navigate("/cart");
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="   block rounded-md px-3 py-2 text-base font-medium">
                Cart
              </a>
              {/* eslint-disable-next-line */}
              <a
                onClick={() => {
                  navigate("/orders");
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="  block rounded-md px-3 py-2 text-base font-medium">
                Orders
              </a>
              {/* eslint-disable-next-line */}

              {user && JSON.stringify(User).match("admin") && auth && (
                <>
                  {/* eslint-disable-next-line */}
                  <a
                    onClick={() => {
                      navigate("/admin");
                      setIsMobileMenuOpen(!isMobileMenuOpen);
                    }}
                    className="  block rounded-md px-3 py-2 text-base font-medium">
                    Admin
                  </a>

                  {/* eslint-disable-next-line */}
                  <a
                    onClick={() => {
                      navigate("/product");
                      setIsMobileMenuOpen(!isMobileMenuOpen);
                    }}
                    className=" block rounded-md px-3 py-2 text-base font-medium">
                    Product
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
