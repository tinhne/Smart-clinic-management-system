import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/users/homepage.jsx";
import AdminApp from "../AdminApp.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Doctors from "./pages/admin/Doctors.jsx";
import Patients from "./pages/admin/Patients.jsx";
import Medication from "./pages/admin/Medication.jsx";
import Services from "./pages/admin/Services.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminApp />,
    children: [
      {
        index: true,
        path: "dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "doctors",
        element: <Doctors></Doctors>,
      },
      {
        path: "patients",
        element: <Patients></Patients>,
      },
      {
        path: "medicine",
        element: <Medication></Medication>,
      },
      {
        path: "dich-vu-kham",
        element: <Services></Services>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
