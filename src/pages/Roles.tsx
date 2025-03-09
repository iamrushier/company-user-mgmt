import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AdminPanelSettings,
  SupervisorAccount,
  Person,
  Gavel,
  SupportAgent,
  WorkOutline,
} from "@mui/icons-material";
import { JSX, useState } from "react";
import useRoleStore from "../../store/zustand/RolesActionsStore";
import { DEFAULT_PERMISSIONS } from "../../store/constants/AccessControlConstants";
import RolePermissionTable from "../components/role/RolePermissionTable";

const roleIcons: { [key: string]: JSX.Element } = {
  Admin: <AdminPanelSettings fontSize="large" color="primary" />,
  Manager: <SupervisorAccount fontSize="large" color="secondary" />,
  User: <Person fontSize="large" color="success" />,
  Moderator: <Gavel fontSize="large" color="warning" />,
  Support: <SupportAgent fontSize="large" color="error" />,
};

const permissionsList = ["users", "companies", "roles", "blogs"] as const;

const Roles = () => {
  const { roles, updateRole, addRole } = useRoleStore();
  const [newRoleName, setNewRoleName] = useState("");

  const handlePermissionChange = (
    roleName: string,
    category: (typeof permissionsList)[number],
    permissionType: "read" | "read_write"
  ) => {
    updateRole(roleName, {
      ...roles[roleName],
      [category]: {
        ...roles[roleName][category],
        [permissionType]: !roles[roleName][category][permissionType],
      },
    });
  };

  const handleAddRole = () => {
    const trimmedRole = newRoleName.trim();
    const normalizedRole = trimmedRole.toLowerCase();

    if (
      !trimmedRole ||
      Object.keys(roles).some((r) => r.toLowerCase() === normalizedRole)
    ) {
      return;
    }

    addRole(trimmedRole, DEFAULT_PERMISSIONS);
    setNewRoleName("");
  };

  return (
    <Container sx={{ mt: 3, maxWidth: "600px" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "center",
          width: "80%",
          mx: "auto",
        }}
      >
        <TextField
          label="New Role Name"
          variant="outlined"
          size="small"
          sx={{ flex: 1 }}
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddRole}>
          Add Role
        </Button>
      </Stack>

      <List>
        {Object.keys(roles).map((roleName) => (
          <ListItem key={roleName}>
            <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <CardContent
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    {roleIcons[roleName] || (
                      <WorkOutline fontSize="large" color="disabled" />
                    )}
                    <Typography variant="h6" fontWeight="bold">
                      {roleName}
                    </Typography>
                  </CardContent>
                </AccordionSummary>

                <AccordionDetails>
                  <RolePermissionTable
                    roles={roles}
                    roleName={roleName}
                    handlePermissionChange={handlePermissionChange}
                  />
                </AccordionDetails>
              </Accordion>
            </Card>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Roles;
