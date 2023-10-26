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
        <div className="text-sm text-gray-500">{User.name}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{User.email}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{User.phone}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{User.address}</div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
        <button
          onClick={(e) => editUser(e, User.custId)}
          className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer">
          <GrEdit />
          Edit
        </button>
        <button
          onClick={(e) => deleteUser(e, User.custId)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">
          <RiDeleteBinLine />
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UsersTable;
