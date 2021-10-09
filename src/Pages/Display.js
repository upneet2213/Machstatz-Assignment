import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";

export const Display = ({ item, fetchData }) => {
  const deleteUser = async () => {
    const response = await fetch(
      `http://3.6.93.159:7883/machstatz/delete_existing_user?email=${item.email}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      alert("User deleted");
    }
    fetchData();
  };
  return (
    <div className="tile">
      <div className="btn-container">
        <button className="btn edit-btn">
          <FaPen />
        </button>
        <button className="btn delete-btn" onClick={deleteUser}>
          <FaTrash />
        </button>
      </div>
      <div className="title">
        <h4 className="name">
          {item.first_name} {item.last_name}
        </h4>
      </div>
    </div>
  );
};
