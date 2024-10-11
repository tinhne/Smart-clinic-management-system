import React from "react";
import { NavLink } from "react-router-dom";
import "../../style/layoutAdmin/admin.scss";

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
            to="/admin/bac-si"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa fa-user-md"></i> Quản lý bác sĩ
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/benh-nhan"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa fa-user"></i> Quản lý bệnh nhân
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/thuoc"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa fa-medkit"></i> Quản lý thuốc
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dich-vu-kham"
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
