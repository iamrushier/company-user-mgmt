import {
  Grid2 as Grid,
  Container,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useUsersData } from "../../store/context/UsersDataContext";
import UserCard from "../components/user/UserCard";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/api_calls";
import { useMemo, useState } from "react";
import { DEFAULT_USER_ROLES } from "../../store/constants/AccessControlConstants";
const Users = () => {
  const { data: userData, dispatch } = useUsersData();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUserData = async () => {
    if (userData.length > 0) return userData;

    try {
      const users = await getAllUsers();
      const assignedUsers = users.map((user, index) => ({
        ...user,
        role: DEFAULT_USER_ROLES[index],
      }));
      dispatch({ type: "SET_USERS", payload: assignedUsers });
      return assignedUsers;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUserData,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  });
  const filteredUsers = useMemo(() => {
    return !searchQuery.trim()
      ? userData || []
      : (userData || []).filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
  }, [searchQuery, userData]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <Container>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Search Users"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearSearch}
          disabled={!searchQuery}
        >
          Clear
        </Button>
      </Box>
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }} key={user.id}>
            <UserCard
              id={user.id}
              name={user.name}
              company={user.company}
              email={user.email}
              role={user.role}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Users;
