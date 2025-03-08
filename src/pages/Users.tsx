import {
  Grid2 as Grid,
  Container,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useUsersData } from "../../store/context/UsersDataContext";
import UserCard from "../components/UserCard";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/api_calls";
import { useState } from "react";

const Users = () => {
  const { data: userData, dispatch } = useUsersData();
  const [localUserData, setLocalUserData] = useState(userData);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUserData = async () => {
    if (userData.length > 0) return userData;

    try {
      const users = await getAllUsers();
      dispatch({ type: "SET_USERS", payload: users });
      setLocalUserData(users);
      return users;
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
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setLocalUserData(userData);
      return;
    }
    const filteredUsers = userData.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setLocalUserData(filteredUsers);
  };
  const handleClearSearch = () => {
    setSearchQuery("");
    setLocalUserData(userData);
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
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
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
        {localUserData.map((user) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }} key={user.id}>
            <UserCard
              id={user.id}
              name={user.name}
              company={user.company}
              email={user.email}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Users;
