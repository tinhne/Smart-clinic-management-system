import React from "react";
import { NavLink } from "react-router-dom";
import "../../style/admin.scss";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <ul>
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa fa-dashboard"></i> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/doctors"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa fa-user-md"></i> Quản lý bác sĩ
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/patients"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa fa-user"></i> Quản lý bệnh nhân
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/medicine"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa fa-medkit"></i> Quản lý thuốc
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/services"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa fa-hospital"></i> Quản lý dịch vụ khám
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/logout"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa fa-sign-out"></i> Sign Out
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
