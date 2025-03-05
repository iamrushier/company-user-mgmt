import React from "react";
import { AppBar, Box, Button, Tab, Tabs, Toolbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "./Title";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

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
              <Tab label="Users" value="/users" />
              <Tab label="Companies" value="/companies" />
              <Tab label="Roles" value="/roles" />
              <Tab label="Blogs" value="/blogs" />
            </Tabs>
          </Box>
          <Button color="inherit">Profile</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
