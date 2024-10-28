import { Outlet } from "react-router-dom";
import DoctorSidebar from "./components/layout/DoctorSidebar";
import "../src/style/LayoutDoctor/LayoutDoctor.scss";

function DoctorApp() {
  return (
    <div className="doctor-app">
      <DoctorSidebar />
      <div className="doctor-content">
        <Outlet />
      </div>
    </div>
  );
}

export default DoctorApp;
