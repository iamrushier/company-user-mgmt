/*
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(Number(id)), // Ensure id is passed as a number
    enabled: !!id, // Only fetch when ID exists
  });

  if (isLoading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (isError || !user) return <Typography color="error">Failed to load user details.</Typography>;
  */
  
import { useParams, useNavigate } from "react-router-dom";
import { useUsersData } from "../../store/context/UsersDataContext";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Stack,
} from "@mui/material";
import { Person, Edit, Delete } from "@mui/icons-material";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: users } = useUsersData();
  const navigate = useNavigate();
  const user = users.find((u) => u.id === Number(id));
  if (!user) return <Typography color="error">User not found.</Typography>;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ width: 400, p: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Avatar
            sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
            src={user.photo || ""}
            alt={user.name}
          >
            {!user.photo && <Person fontSize="large" />}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            @{user.username}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body2">
            <strong>Company:</strong> {user.company}
          </Typography>
          <Typography variant="body2">
            <strong>Address:</strong> {user.address}, {user.state}, {user.zip},{" "}
            {user.country}
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong> {user.phone}
          </Typography>

          {/* Edit & Delete Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={() => navigate(`/users/edit/${id}`)}
            >
              Edit
            </Button>
            <Button variant="contained" color="error" startIcon={<Delete />}>
              Delete
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDetails;