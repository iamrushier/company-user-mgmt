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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
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
    if (!newRoleName.trim() || roles[newRoleName]) return;
    const defaultPermissions = {
      users: { read: false, read_write: false },
      companies: { read: false, read_write: false },
      roles: { read: false, read_write: false },
      blogs: { read: false, read_write: false },
    };
    addRole(newRoleName, defaultPermissions);
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
                  <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <strong>Permissions</strong>
                          </TableCell>
                          {permissionsList.map((perm) => (
                            <TableCell key={perm} align="center">
                              {perm.charAt(0).toUpperCase() + perm.slice(1)}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <strong>Read</strong>
                          </TableCell>
                          {permissionsList.map((category) => (
                            <TableCell key={category} align="center">
                              <Checkbox
                                checked={roles[roleName][category].read}
                                {...(category === "roles" ||
                                roleName === "Admin"
                                  ? { disabled: true }
                                  : {})}
                                onChange={() =>
                                  handlePermissionChange(
                                    roleName,
                                    category,
                                    "read"
                                  )
                                }
                              />
                            </TableCell>
                          ))}
                        </TableRow>

                        <TableRow>
                          <TableCell>
                            <strong>Read & Write</strong>
                          </TableCell>
                          {permissionsList.map((category) => (
                            <TableCell key={category} align="center">
                              <Checkbox
                                checked={roles[roleName][category].read_write}
                                {...(roleName === "Admin"
                                  ? { disabled: true }
                                  : {})}
                                onChange={() =>
                                  handlePermissionChange(
                                    roleName,
                                    category,
                                    "read_write"
                                  )
                                }
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
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
