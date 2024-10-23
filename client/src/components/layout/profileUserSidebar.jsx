import React from "react";
import { NavLink } from "react-router-dom";
import "../../style/userProfile/profileSidebar.scss";

const ProfileSidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/thong-tin-ca-nhan/lich-kham"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Lịch khám
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/thong-tin-ca-nhan/lich-su-thanh-toan"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Lịch sử thanh toán
            </NavLink>
          </li>
          <li>
            <a href="ho-so" className="active">
              Hồ sơ
            </a>
          </li>
          <li>
            <NavLink
              to="/thong-tin-ca-nhan/tai-khoan"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Tài khoản
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Đăng xuất
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
