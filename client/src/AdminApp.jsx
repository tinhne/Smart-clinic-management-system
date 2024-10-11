import { Outlet } from "react-router-dom";
import AdminHeader from "./components/layout/AdminHeader";
import AdminSidebar from "./components/layout/AdminSidebar";
import "../src/style/layoutAdmin/admin.scss";

function AdminApp() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminApp;
