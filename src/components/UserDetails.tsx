/*
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(Number(id)),
    enabled: !!id, 
  });

  if (isLoading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (isError || !user) return <Typography color="error">Failed to load user details.</Typography>;
*/
import { useParams, useNavigate } from "react-router-dom";
import { useUsersData } from "../../store/context/UsersDataContext";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Avatar,
  Button,
  Grid2 as Grid,
  Divider,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Person,
  Edit,
  Delete,
  Email,
  Business,
  Home,
  Phone,
  ArrowBack,
} from "@mui/icons-material";
import { useState } from "react";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: users, dispatch } = useUsersData();
  const navigate = useNavigate();
  const user = users.find((u) => u.id === Number(id));
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!user)
    return (
      <Box
        sx={{
          textAlign: "center",
          mt: 5,
        }}
      >
        <Typography color="error" variant="h6">
          User not found.
        </Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/users")}
          sx={{ mt: 2 }}
        >
          Back to Users
        </Button>
      </Box>
    );

  const handleConfirmDelete = () => {
    dispatch({ type: "DELETE_USER", id: user.id });
    setDeleteDialogOpen(false);
    navigate("/users");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/users")}
        variant="text"
        color="primary"
        sx={{ mb: 3 }}
      >
        Back to Users
      </Button>

      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 64, height: 64, bgcolor: "primary.main" }}
              src={user.photo || ""}
              alt={user.name}
            >
              {!user.photo && <Person sx={{ fontSize: 40 }} />}
            </Avatar>
          }
          title={
            <Typography variant="h5" fontWeight="bold">
              {user.name}
            </Typography>
          }
          subheader={
            <Chip
              label={`@${user.username}`}
              size="small"
              variant="outlined"
              sx={{ mt: 0.5 }}
            />
          }
          action={
            <Box sx={{ display: "flex", gap: 1, mt: 1, mr: 1 }}>
              <Tooltip title="Edit User">
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/users/edit/${id}`)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete User">
                <IconButton
                  color="error"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          }
          sx={{ pb: 0 }}
        />

        <Divider sx={{ mx: 2, my: 2 }} />

        <CardContent sx={{ pt: 2, px: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Email color="action" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Box>
              </Box>
            </Grid>
            {[
              ["Phone", user.phone, <Phone color="action" />],
              ["Company", user.company, <Business color="action" />],
              [
                "Address",
                `${user.address}, ${user.state}, ${user.zip}, ${user.country}`,
                <Home color="action" />,
              ],
            ].map(([label, value, icon], index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body1">{value}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {user.name}? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetails;
