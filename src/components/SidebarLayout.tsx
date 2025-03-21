import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import useRoleStore from "../../store/zustand/RolesActionsStore";
import { useAuthUserStore } from "../../store/zustand/AuthUserStore";

const drawerWidth = 240;

const LayoutContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 64px)",
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  width: `calc(100% - ${open ? drawerWidth : 0}px)`,
  padding: theme.spacing(3),
  marginLeft: "auto",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

interface IAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface ISidebarLayoutPropsType {
  title: string;
  handleShowAll?: () => void;
  handleAddNew?: () => void;
}

type RoleKeyType = "users" | "companies" | "roles" | "blogs";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<IAppBarProps>(({ theme, open }) => ({
  width: `calc(100% - ${open ? drawerWidth : 0}px)`,
  backgroundColor: "white",
  color: "black",
  marginLeft: "auto",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SidebarLayout(props: ISidebarLayoutPropsType) {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const { user: loggedInUser } = useAuthUserStore();
  const { roles } = useRoleStore();
  const userRole =
    loggedInUser && typeof loggedInUser === "object" && "role" in loggedInUser
      ? loggedInUser.role
      : null;
  return (
    <>
      <Header />
      <LayoutContainer>
        <CssBaseline />
        <AppBar position="relative" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {`${props.title}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Drawer
            sx={{
              width: open ? `${drawerWidth}px` : 0,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: open ? `${drawerWidth}px` : 0,
                boxSizing: "border-box",
                top: "64px",
                height: "calc(100vh - 64px)",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navigate(`/${props.title.toLowerCase()}`);
                  }}
                >
                  <ListItemText
                    primary={
                      props.title.toLowerCase() === "roles"
                        ? "Edit roles"
                        : "Show all"
                    }
                  />
                </ListItemButton>
              </ListItem>
              {userRole &&
                roles[userRole][props.title.toLowerCase() as RoleKeyType]
                  .read_write && (
                  <ListItem>
                    <ListItemButton
                      onClick={() => {
                        const endpoint = props.title.toLowerCase();
                        navigate(
                          `/${endpoint}/${
                            endpoint === "roles" ? "assign" : "add"
                          }`
                        );
                      }}
                    >
                      <ListItemText
                        primary={
                          props.title.toLowerCase() === "roles"
                            ? "Assign roles"
                            : "Add new"
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                )}
            </List>
          </Drawer>
          <Main open={open} sx={{ mt: 3, height: "80vh", overflowY: "auto" }}>
            <Outlet />
          </Main>
        </Box>
      </LayoutContainer>
    </>
  );
}
