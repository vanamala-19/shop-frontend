import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ThemeContext from "./context/ThemeContext";

// Layout & Common Components
import Layout from "./components/Layout";
import DisclaimerAlert from "./components/DisclaimerAlert";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

// Public Pages
import Login from "./components/Login";
import Register from "./components/Register";
import Unauthorized from "./components/Unauthorized";
import Missing from "./components/Missing";

// User Pages
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import AddUser from "./components/AddUser";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage";

// Admin Pages
import Users from "./components/Users";
import Product from "./components/Product";

function App() {
  const { theme } = useContext(ThemeContext);

  document.title = "SHOP";

  const appStyle = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    minHeight: "100vh",
  };

  return (
    <div style={appStyle}>
      <DisclaimerAlert />
      <Routes>
        {/* Layout wraps Navbar and renders Outlet */}
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="product/:id" element={<ProductPage />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            {/* User + Admin Routes */}
            <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
              <Route path="/" element={<Home />} />
              <Route path="user" element={<UserPage />} />
              <Route path="addUser" element={<AddUser />} />
              <Route path="orders" element={<Orders />} />
              <Route path="cart" element={<Cart />} />
            </Route>

            {/* Admin Only Routes */}
            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
              <Route path="admin" element={<Users />} />
              <Route path="product" element={<Product />} />
            </Route>
          </Route>

          {/* Catch-All */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
