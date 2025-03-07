import {
  Container,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import {
  AdminPanelSettings,
  SupervisorAccount,
  Person,
  Gavel,
  SupportAgent,
  WorkOutline,
} from "@mui/icons-material";
import { useRolesData } from "../../store/context/RolesDataContext";
import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../../api/api_calls";
import { JSX } from "react";

const roleIcons: { [key: string]: JSX.Element } = {
  Admin: <AdminPanelSettings fontSize="large" color="primary" />,
  Manager: <SupervisorAccount fontSize="large" color="secondary" />,
  User: <Person fontSize="large" color="success" />,
  Moderator: <Gavel fontSize="large" color="warning" />,
  Support: <SupportAgent fontSize="large" color="error" />,
};

const Roles = () => {
  const { data: rolesData, dispatch } = useRolesData();

  const fetchRoles = async () => {
    if (rolesData.length > 0) return rolesData;
    try {
      const roles = await getAllRoles();
      dispatch({ type: "SET_ROLES", payload: roles });
      return roles;
    } catch (error) {
      console.error("Error fetching roles:", error);
      return [];
    }
  };

  useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <Container sx={{ mt: 3, maxWidth: "450px", justifyItems: "center" }}>
      <List>
        {rolesData.map((role) => (
          <ListItem key={role.id}>
            <Card sx={{ width: "450px", borderRadius: 2, boxShadow: 3 }}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                {roleIcons[role.name] || (
                  <WorkOutline fontSize="large" color="disabled" />
                )}
                <div>
                  <Typography variant="h6" fontWeight="bold">
                    {role.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {role.description}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Roles;
