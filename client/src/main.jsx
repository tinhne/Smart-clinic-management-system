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
import PrivateRoute from "./components/Private/PrivateRoute.jsx"; // Import PrivateRoute
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginRegister from "./pages/users/LoginRegister.jsx";
import Logout from "./pages/admin/Logout.jsx";
import DoctorList from "./pages/users/DoctorList.jsx";
import DoctorProfile from "./pages/users/DoctorProfile.jsx";
import PatientRecord from "./pages/users/PatientRecord.jsx";
import AppointmentSuccess from "./pages/users/AppointmentSuccess.jsx";
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
        path: "/dat-kham/bac-si/",
        element: <DoctorProfile />,
      },
      {
        path: "/dat-kham/bac-si/tim-kiem",
        element: <DoctorList />,
      },
      {
        path: "/dat-kham/ho-so",
        element: <PatientRecord />,
      },
      {
        path: "/dat-kham/ho-so/thanh-cong",
        element: <AppointmentSuccess />,
      },
    ],
  },
  {
    path: "/admin",
    element: <PrivateRoute allowedRoles={["admin"]} />,
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
