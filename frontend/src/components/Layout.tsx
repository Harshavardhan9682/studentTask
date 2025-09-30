// import { Box } from "@mui/material";
// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
// import { AuthProvider } from "../context/LoginContext";
// import AdminDashboard from "../AdminDashboard/AdminDashboard";

// function Layout() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AuthProvider>
//         <ErrorBoundary>
//           <Header />
//         </ErrorBoundary>
//       </AuthProvider>

//       <Box p={3}>
//         <AuthProvider>
//           <Outlet />
//             {/* <AdminDashboard /> */}
//         </AuthProvider>
//       </Box>
//     </Box>
//   );
// }

// export default Layout;
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { AuthProvider } from "../context/LoginContext";

function Layout() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AuthProvider>
        <ErrorBoundary>
          <Box>
            <Outlet />
          </Box>
        </ErrorBoundary>
      </AuthProvider>
    </Box>
  );
}

export default Layout;

