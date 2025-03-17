import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "./Title";
import { Login, Logout } from "@mui/icons-material";
import { useAuthUserStore } from "../../store/zustand/AuthUserStore";
import useRoleStore from "../../store/zustand/RolesActionsStore";

const Header = () => {
  const { isLoggedIn, user, updateLoginStatus, updateCredentials, updateUser } =
    useAuthUserStore();
  const location = useLocation();
  const navigate = useNavigate();
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = async () => {
    navigate("/");
    setTimeout(() => {
      updateLoginStatus(false);
      updateCredentials({ username: "", password: "" });
      updateUser({});
    }, 500);
  };

  const { roles } = useRoleStore();
  const userRole =
    user && typeof user === "object" && "role" in user ? user.role : null;
  return (
    <>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Title />
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <Tabs
              value={"/" + location.pathname.split("/")[1]}
              onChange={handleChange}
              sx={{ flexGrow: 1 }}
              textColor="inherit"
            >
              <Tab label="Dashboard" value="/" />
              {userRole && roles[userRole]?.users?.read && (
                <Tab label="Users" value="/users" />
              )}
              {userRole && roles[userRole]?.companies?.read && (
                <Tab label="Companies" value="/companies" />
              )}
              {userRole && roles[userRole]?.roles?.read_write && (
                <Tab label="Roles" value="/roles" />
              )}
              {userRole && roles[userRole]?.blogs?.read && (
                <Tab label="Blogs" value="/blogs" />
              )}
            </Tabs>
          </Box>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {isLoggedIn ? user?.name : "My Account"} |{" "}
          {isLoggedIn ? user?.role : "Guest"}
        </MenuItem>
        <Divider />
        <MenuItem onClick={isLoggedIn ? handleLogout : handleLogin}>
          <ListItemIcon>
            {isLoggedIn ? (
              <Logout fontSize="small" />
            ) : (
              <Login fontSize="small" />
            )}
          </ListItemIcon>
          {isLoggedIn ? "Logout" : "Login"}
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
