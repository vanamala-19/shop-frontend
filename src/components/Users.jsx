import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UsersTable from "./UserTable";
import Search from "./Search";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import Pagination from "./Pagination";
import UserService from "../api/UserService";

const Users = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const { getAllUsers } = UserService();
  const itemsPerPage = 10;

  document.title = "SHOP | aDMIN";

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
        console.log(response);
      } catch (err) {
        console.error(err);
        navigate("/", { state: { from: location }, replace: true });
      }
    };
    getuser();
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("custName");
  const [orderBy, setOrderBy] = useState("asc");

  const deleteUser = (e, id) => {
    e.preventDefault();
    axiosPrivate.deleteUser("/user/delete/" + id).then((res) => {
      if (users) {
        setUsers((prevElement) => {
          return prevElement.filter((User) => User.custId !== id);
        });
      }
    });
  };

  // let filteredUsers = null;
  // if (users?.length) {
  //   filteredUsers = users
  //     .filter((User) => {
  //       return (
  //         User?.custName.toLowerCase().includes(query.toLowerCase()) ||
  //         User?.custEmail.toLowerCase().includes(query.toLowerCase()) ||
  //         User?.custAdress.toLowerCase().includes(query.toLowerCase()) ||
  //         Number(User.custPhone).toString().includes(query)
  //       );
  //     })
  // .sort((a, b) => {
  //   let order = orderBy === "asc" ? 1 : -1;
  //   return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
  //     ? -1 * order
  //     : 1 * order;
  // });
  // }

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const paginatedUsers = filteredUsers?.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto my-8">
      <Search
        query={query}
        onQueryChange={(myQuery) => setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={(mySort) => setOrderBy(mySort)}
        sortBy={sortBy}
        onSortByChange={(mySort) => setSortBy(mySort)}
      />
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking- py-3 px-6">
                SNO
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking- py-3 px-6">
                USERNAME
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking- py-3 px-6">
                NAME
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking- py-3 px-6">
                EMAIL
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking- py-3 px-6">
                Phone_No
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking- py-3 px-6">
                Adress
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking- py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          {users.length ? (
            <tbody className="bg-white">
              {users.map((User, i) => (
                <UsersTable
                  User={User}
                  deleteUser={deleteUser}
                  id={i}
                  key={i}
                />
              ))}
            </tbody>
          ) : null}
        </table>
      </div>
      <Pagination setPage={setPage} page={page} items={10} />
    </div>
  );
};

export default Users;
