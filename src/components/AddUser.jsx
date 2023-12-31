import { useState } from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./Loading";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";

const AddUser = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState();
  const [user, setuser] = useState({
    custId: "",
    custName: "",
    custEmail: "",
    custAdress: "",
    custPhone: "",
    custUsername: JSON.parse(localStorage.getItem("user")),
  });

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setuser({ ...user, [e.target.name]: value });
  };

  const reset = (e) => {
    e.preventDefault();
    setuser({
      custId: "",
      custName: "",
      custEmail: "",
      custAdress: "",
      custPhone: "",
      custUsername: localStorage.getItem("user"),
    });
    navigate("/users");
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(user);
      const response = await axiosPrivate.post(
        "/user/add",
        {
          id: user.custId,
          name: user.custName,
          address: user.custAdress,
          email: user.custEmail,
          phone: user.custPhone,
          username: user.custUsername,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setLoading(false);
      console.log(response);
      navigate("/user");
    } catch (err) {
      console.error(err);
      navigate("/user");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className={` flex max-w-2xl mx-auto shadow border-b`}>
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Add New User</h1>
        </div>
        <div className={` items-center justify-center h-14 w-full my-4`}>
          <label className="block dark:text-white text-gray-600 text-sm font-normal">
            Name:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="custName"
            value={user.custName}
            className={`btn-${theme} h-10 w-96 border mt-2 px-2 py-2`}></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block dark:text-white text-gray-600 text-sm font-normal">
            Email:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="custEmail"
            value={user.custEmail}
            className={`btn-${theme} h-10 w-96 border mt-2 px-2 py-2`}></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block dark:text-white text-gray-600 text-sm font-normal">
            Adress:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="custAdress"
            value={user.custAdress}
            className={`btn-${theme} h-10 w-96 border mt-2 px-2 py-2`}></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block dark:text-white text-gray-600 text-sm font-normal">
            Phone:
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="custPhone"
            value={user.custPhone}
            className={`btn-${theme} h-10 w-96 border mt-2 px-2 py-2`}></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 pt-4 space-x-4">
          <button
            onClick={saveUser}
            className="rounded text-white font-semibold hover:bg-green-800 bg-green-400 px-6 py-2">
            Save
          </button>
          <button
            onClick={reset}
            className="rounded text-white font-semibold hover:bg-red-800 bg-red-400 px-6 py-2">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
