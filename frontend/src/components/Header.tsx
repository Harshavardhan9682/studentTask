import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/LoginContext";
import { sessionStorageGetItem } from "../axiosInstance/sessionStorage";

export default function Header() {
  let isRole:string;
  const role=sessionStorageGetItem("role")
if (role==="admin"){
  isRole="Admin";

}else if(role==="student"){
  isRole="Student";

}else if(role==="admissionStaff"){
  isRole="AdmissionStaff"
}else{
  isRole="Teacher"
}
  console.log(role)
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    navigate("/");
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{isRole} Dashboard</Typography>

        <Box>
          <Button color="inherit" onClick={handleClick}>
            <img src="/p2.png" alt="person2.png" width={"20px"} />
          </Button>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {location.pathname.startsWith("/admin") && (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
