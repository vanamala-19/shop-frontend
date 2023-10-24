import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import AddUser from "./components/AddUser";
import Users from "./components/Users";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import ProductPage from "./components/ProductPage";
import React, { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
function App() {
  const { theme } = useContext(ThemeContext);
  document.title = "SHOP";
  const lightStyle = {
    backgroundColor: "#fff",
    color: "#000",
  };

  const darkStyle = {
    backgroundColor: "#333",
    color: "#fff",
  };
  return (
    <div style={theme === "light" ? lightStyle : darkStyle}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* we need to protect this routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/addUser" element={<AddUser />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<Users />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="/missing" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
