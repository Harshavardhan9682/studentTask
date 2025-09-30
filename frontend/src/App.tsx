import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Students from "./student/Students";
// import RegisterForm from "./pages/Register";
import SessionExpired from "./components/sessionExpired";
import LoginForm from "./pages/Login";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
// import ProtectedRoute from "./protectedRoute";
import DashboardCard from "./components/DashboardCard";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import AdmissionStaffTable from "./admissionStaff/admissionStaffTable";
import TeachersTable from "./teacher/teacherTable";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "/",
        element: (
          <ErrorBoundary>
            <LoginForm />
          </ErrorBoundary>
        ),
      },
      {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      { path: "", element: null }, // dashboard cards inside AdminDashboard
      { path: "students", element: <Students /> },
      { path: "Teachers", element: <TeachersTable /> },
      { path: "AdminStaff", element: <AdmissionStaffTable /> },
      { path: "Charts", element: <DashboardCard /> },
    ],
  },


      {
        path: "sessionExpired",
        element: (
          <ErrorBoundary>
            <SessionExpired />
          </ErrorBoundary>
        ),
      },

      // {path:"/register",element:<ErrorBoundary><RegisterForm /></ErrorBoundary>},
      {
        path: "/login",
        element: (
          <ErrorBoundary>
            <LoginForm />
          </ErrorBoundary>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
