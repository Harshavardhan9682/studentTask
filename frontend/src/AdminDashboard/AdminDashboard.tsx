// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Toolbar,
//   Box,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import Header from "../components/Header";

// const drawerWidth = 245;

// const AdminDashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(true); // Drawer state
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const showSidebar =
//     location.pathname.startsWith("/admin/") && location.pathname !== "/admin";

//   const showDashboard = location.pathname === "/admin";

//   const menuItems = [
//     { label: "Admission Staff", path: "/admin/AdminStaff" },
//     { label: "Student Management", path: "/admin/students" },
//     { label: "Teacher Management", path: "/admin/Teachers" },
//     { label: "Student Charts", path: "/admin/Charts" },
//   ];

//   if (loading) {
//     return (
//       <div className="admin-skeleton-wrapper">
//         <h1>Loading...</h1>
//       </div>
//     );
//   }

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
//       <Header />
//       <IconButton
//         color="inherit"
//         edge="start"
//         onClick={() => setOpen(!open)}
//         sx={{ position: "absolute", top: 70, left: 10 }}
//       >
//         <MenuIcon />
//       </IconButton>

//       <Box sx={{ flexGrow: 1 }}>
//         {showSidebar && (
//           <Drawer
//             variant="persistent"
//             open={open}
//             sx={{
//               width: drawerWidth,
//               flexShrink: 0,
//               [`& .MuiDrawer-paper`]: {
//                 width: drawerWidth,
//                 boxSizing: "border-box",
//                 backgroundColor: "#1976d2",
//                 color: "white",
//                 top: "64px",
//               },
//             }}
//           >
//             <Toolbar />
//             <Typography variant="h6" sx={{ p: 2 }}>
//               Admin Panel
//             </Typography>
//             <List>
//               {menuItems.map((item) => (
//                 <ListItem key={item.path} disablePadding>
//                   <ListItemButton onClick={() => navigate(item.path)}>
//                     <ListItemText primary={item.label} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//           </Drawer>
//         )}

//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             marginLeft: showSidebar && open ? `${drawerWidth}px` : 0,
//             marginTop: "0px",
//             transition: "margin-left 0.3s ease",
//           }}
//         >
//           {showDashboard ? (
//             <div className="container-Admin">
//               {menuItems.map((item) => (
//                 <Typography
//                   key={item.path}
//                   variant="h5"
//                   onClick={() => navigate(item.path)}
//                   sx={{ cursor: "pointer", mb: 2 }}
//                 >
//                   {item.label}
//                 </Typography>
//               ))}
//             </div>
//           ) : (
//             <Outlet />
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Header from "../components/Header";

const drawerWidth = 245;

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  
  const showSidebar =
    location.pathname.startsWith("/admin/") && location.pathname !== "/admin";

  const showDashboard = location.pathname === "/admin";

  const menuItems = [
    { label: "Admission Staff", path: "/admin/AdminStaff" },
    { label: "Student Management", path: "/admin/students" },
    { label: "Teacher Management", path: "/admin/Teachers" },
    { label: "Student Charts", path: "/admin/Charts" },
  ];
const display=showDashboard?"none":""

  if (loading) {
    return (
      <div className="admin-skeleton-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      
      <IconButton
        color="inherit"
        edge="start"
        onClick={() => setOpen(!open)}
        
        sx={{ position: "absolute", top: 70, left: 10 ,display:`${display}`}}
      >
        <MenuIcon />
      </IconButton>

      <Box sx={{ flexGrow: 1 }}>
        {showSidebar && (
          <Drawer
            variant="persistent"
            open={open}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "#1976d2",
                color: "white",
                top: "64px",
              },
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
              }}
            >
              <Typography variant="h6">Admin Panel</Typography>
              <IconButton onClick={() => setOpen(!open)} sx={{ color: "white", }}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>

            <List>
              {menuItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton onClick={() => navigate(item.path)}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        )}

        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: showSidebar && open ? `${drawerWidth}px` : 0,
            marginTop: "0px",
            transition: "margin-left 0.3s ease",
          }}
        >
          {showDashboard ? (
            <div className="container-Admin">
              {menuItems.map((item) => (
                <Typography
                  key={item.path}
                  variant="h5"
                  onClick={() => navigate(item.path)}
                  sx={{ cursor: "pointer", mb: 2 }}
                >
                  {item.label}
                </Typography>
              ))}
            </div>
          ) : (
            <Outlet />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
