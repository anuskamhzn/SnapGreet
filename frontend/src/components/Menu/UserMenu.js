import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center" style={{ paddingTop: "20px" }}>
      <div className="list-group">
        <NavLink
          to="/dashboard/user/userdb"
          className="list-group-item list-group-item-action"
        >
          Dashboards
        </NavLink>
        <NavLink
          to="/dashboard/user/request"
          className="list-group-item list-group-item-action"
        >
          Your Requests
        </NavLink>
        <NavLink
          to="/dashboard/user/user-temp"
          className="list-group-item list-group-item-action"
        >
          Templates
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
