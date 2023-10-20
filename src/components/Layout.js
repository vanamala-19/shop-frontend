import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <main className="App">
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
