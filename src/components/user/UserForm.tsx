import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid2 as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import { useUsersData } from "../../../store/context/UsersDataContext";
import { useCompaniesData } from "../../../store/context/CompaniesDataContext";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username must contain only letters, numbers, or underscores"
    ),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[+\d-]+$/, "Phone number can only contain digits, '+', and '-'")
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number cannot exceed 15 characters"),

  company: z.string().min(1, "Company is required"),
  address: z.string().min(1, "Address is required"),
  zip: z.string().regex(/^\d{4,10}$/, "Zip code must be between 4-10 digits"),
  state: z.string().min(2, "State must be valid"),
  country: z.string().min(2, "Country must be valid"),
});

type UserFormData = z.infer<typeof userSchema>;

const UserForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { data: users, dispatch } = useUsersData();
  const { data: companies } = useCompaniesData();

  const [isEditMode, setIsEditMode] = useState(!isEditing);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (isEditing) {
      const user = users.find((u) => u.id === Number(id));
      if (user) {
        Object.keys(user).forEach((key) => {
          const fieldKey = key as keyof UserFormData;
          if (user[fieldKey] !== undefined) {
            setValue(fieldKey, user[fieldKey]);
          }
        });
        setIsEditMode(false);
      } else {
        setSnackbar({
          open: true,
          message: "User not found!",
          severity: "error",
        });
        setTimeout(() => {
          navigate("/users");
        }, 2000);
      }
    } else {
      reset();
      setIsEditMode(true);
    }
  }, [id, isEditing, users, setValue, reset]);

  const onSubmit = (data: UserFormData) => {
    if (isEditing) {
      dispatch({
        type: "UPDATE_USER",
        payload: [{ ...data, id: Number(id), role: "User" }],
      });
      setSnackbar({
        open: true,
        message: "User updated successfully!",
        severity: "success",
      });
    } else {
      const newUser = { ...data, id: Date.now(), role: "User" };
      dispatch({ type: "ADD_USER", payload: [newUser] });
      setSnackbar({
        open: true,
        message: "User updated successfully!",
        severity: "success",
      });
    }
    setTimeout(() => {
      navigate("/users");
    }, 2000);
  };

  return (
    <Container>
      <Paper sx={{ p: 3, mt: 4, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" mb={2}>
          {isEditing ? "Edit User" : "Add New User"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Username"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="company"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.company}>
                    <InputLabel>Company</InputLabel>
                    <Select {...field} disabled={!isEditMode}>
                      {companies.map((company) => (
                        <MenuItem key={company.id} value={company.name}>
                          {company.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.company && (
                      <FormHelperText>{errors.company.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="Zip Code"
                {...register("zip")}
                error={!!errors.zip}
                helperText={errors.zip?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="State"
                {...register("state")}
                error={!!errors.state}
                helperText={errors.state?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="Country"
                {...register("country")}
                error={!!errors.country}
                helperText={errors.country?.message}
                disabled={!isEditMode}
              />
            </Grid>
          </Grid>

          <Box
            sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "flex-end" }}
          >
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  {isEditMode ? "Cancel" : "Edit"}
                </Button>
                {isEditMode && (
                  <Button variant="contained" color="success" type="submit">
                    Update
                  </Button>
                )}
              </>
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Add User
              </Button>
            )}
          </Box>
        </form>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserForm;
