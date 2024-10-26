import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/users/homepage.jsx";
import AdminApp from "./AdminApp.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Doctors from "./pages/admin/Doctors.jsx";
import Patients from "./pages/admin/Patients.jsx";
import Medication from "./pages/admin/Medication.jsx";
import Services from "./pages/admin/Services.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import LoginAdmin from "./pages/admin/LoginAdmin.jsx";
import PrivateRouteAdmin from "./components/Private/PrivateRouteAdmin.jsx"; // Import PrivateRoute
import PrivateRouteDoctor from "./components/Private/PrivateRouteDoctor.jsx"; // Import PrivateRoute
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginRegister from "./pages/users/LoginRegister.jsx";
import Logout from "./pages/admin/Logout.jsx";
import DoctorList from "./pages/users/DoctorList.jsx";
import DoctorProfile from "./pages/users/DoctorProfile.jsx";
import PatientRecord from "./pages/users/PatientRecord.jsx";
import AppointmentSuccess from "./pages/users/AppointmentSuccess.jsx";
import Profile from "./pages/users/profile.jsx";
import ProfileInfo from "./components/user/profileInfo.jsx";
import ChangePassword from "./components/user/ChangePassword.jsx";
import Appointment from "./components/user/Appointment.jsx";
import VideoPage from "./pages/videocall/VideoHomePage.jsx";
import ServiceClinic from "./pages/users/ServiceClinic.jsx";
import ClinicInfo from "./pages/users/ClinicInfor.jsx";
import DoctorApp from "./DoctorApp.jsx";
import DoctorInfor from "./pages/Doctor/DoctorInfor.jsx";
import ViewPatientRecord from "./pages/Doctor/ViewPatientRecord.jsx";
import ViewSchedule from "./pages/Doctor/ViewSchedule.jsx";
const router = createBrowserRouter([
  {
    path: "/login-register",
    element: <LoginRegister></LoginRegister>,
  },
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "gioi-thieu",
        element: <ClinicInfo />,
      },
      {
        path: "/dich-vu-kham",
        element: <ServiceClinic />,
      },
      {
        path: "/dat-kham/bac-si/:doctorId",
        element: <DoctorProfile />,
      },
      {
        path: "/dat-kham/bac-si/tim-kiem",
        element: <DoctorList />,
      },
      {
        path: "/dat-kham/ho-so-lich/:idDoctor/:idPatient",
        element: <PatientRecord />,
      },
      {
        path: "/dat-kham/ho-so/thanh-cong",
        element: <AppointmentSuccess />,
      },
      {
        path: "",
        element: <Profile />,
        children: [
          {
            path: "/thong-tin/ho-so",
            element: <ProfileInfo />,
          },
          {
            path: "/thong-tin/tai-khoan",
            element: <ChangePassword />,
          },
          {
            path: "/thong-tin/lich-kham",
            element: <Appointment />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <PrivateRouteAdmin allowedRoles={["admin"]} />,
    children: [
      {
        element: <AdminApp />,
        children: [
          {
            index: true,
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "bac-si",
            element: <Doctors />,
          },
          {
            path: "benh-nhan",
            element: <Patients />,
          },
          {
            path: "thuoc",
            element: <Medication />,
          },
          {
            path: "dich-vu-kham",
            element: <Services />,
          },
        ],
      },
    ],
  },
  {
    path: "/room/:id",
    element: <VideoPage />,
  },
  {
    path: "/admin/login", // Public login page
    element: <LoginAdmin />,
  },
  {
    path: "/admin/logout",
    element: <Logout />,
  },
  {
    path: "/tin-tuc/",
    element: <Blog />,
    children: [
      {
        index: true,
        element: <Blog />,
      },
    ],
  },

  {
    path: "",
    // element: <PrivateRouteDoctor allowedRoles={["doctor"]} />,
    children: [
      {
        element: <DoctorApp />,
        children: [
          {
            index: true,
            path: "bac-si/ho-so",
            element: <DoctorInfor />,
          },
          {
            path: "bac-si/ho-so-benh-nhan",
            element: <ViewPatientRecord />,
          },
          {
            path: "bac-si/lich-hen",
            element: <ViewSchedule />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);
