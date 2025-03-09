import {
  Container,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Avatar,
} from "@mui/material";
import { useUsersData } from "../../../store/context/UsersDataContext";
import { useRolesData } from "../../../store/context/RolesDataContext";

const RoleDetails = () => {
  const { data: users, dispatch: userDispatch } = useUsersData();
  const { data: roles } = useRolesData();

  const handleRoleChange = (userId: number, newRole: string) => {
    const updatedUser = users.find((user) => user.id === userId);
    if (!updatedUser) return;
    console.log("New role ", newRole);
    userDispatch({
      type: "UPDATE_USER",
      payload: [{ ...updatedUser, role: newRole }],
    });
  };

  return (
    <Container sx={{ mt: 3, maxWidth: "600px" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Assign Roles to Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Avatar src={user.photo} alt={user.name}>
                  {user.name.charAt(0)}
                </Avatar>
                <div style={{ flexGrow: 1 }}>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.company}
                  </Typography>
                </div>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.name}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default RoleDetails;
