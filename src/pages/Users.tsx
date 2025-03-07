import { Grid2 as Grid, Container } from "@mui/material";
import { useUsersData } from "../../store/context/UsersDataContext";
import UserCard from "../components/UserCard";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/api_calls";

const Users = () => {
  const { data: userData, dispatch } = useUsersData();
  const fetchUserData = async () => {
    if (userData.length > 0) {
      return userData;
    }
    try {
      const userData = await getAllUsers();
      dispatch({ type: "SET_USERS", payload: userData });
      return userData;
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
  return (
    <Container>
      <Grid container spacing={3}>
        {userData.map((user) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={user.id}>
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
