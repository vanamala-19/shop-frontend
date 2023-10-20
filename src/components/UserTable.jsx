import React from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";

const UsersTable = ({ User, deleteUser, id }) => {
  const navigate = useNavigate();
  const editUser = (e, id) => {
    e.preventDefault();
    navigate(`/editUser/${id}`);
  };

  return (
    <tr key={User.custId}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{id + 1}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{User.username}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{User.custName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{User.custEmail}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{User.custPhone}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{User.custAdress}</div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
        <button
          onClick={(e, id) => editUser(e, User.custId)}
          className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer">
          <GrEdit />
          Edit
        </button>
        <button
          onClick={(e, id) => deleteUser(e, User.custId)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">
          <RiDeleteBinLine />
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UsersTable;
