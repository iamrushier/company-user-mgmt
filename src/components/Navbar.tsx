import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={location.pathname}
        onChange={handleChange}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Dashboard" value="/" />
        <Tab label="Users" value="/users" />
        <Tab label="Companies" value="/companies" />
        <Tab label="Roles" value="/roles" />
        <Tab label="Blogs" value="/blogs" />
        <Tab label="Profile" value="/profile" sx={{ marginLeft: "auto" }} />
      </Tabs>
    </Box>
  );
};

export default Navbar;
