import {
  AppBar,
  Card,
  Toolbar,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Title from "../components/Title";
import { useAuthUserStore } from "../../store/zustand/AuthUserStore";
import { useMutation } from "@tanstack/react-query";
import { getAllUsers, tryLoginForUser } from "../../api/api_calls";
import { ICredentials } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { roles } from "../../store/constants/roles";
import {
  IUserWithRole,
  useUsersData,
} from "../../store/context/UsersDataContext";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { updateLoginStatus, updateCredentials, updateUser } =
    useAuthUserStore();
  const [message, setMessage] = useState("");
  const { data: userData } = useUsersData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const mutation = useMutation({
    mutationFn: async (credentials: ICredentials) => {
      const response = await tryLoginForUser(credentials);
      return response;
    },
    onSuccess: (data, variables) => {
      updateLoginStatus(data.success);
      updateCredentials(variables);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
      /* navigate("/");*/
    },
    onError: (error: any) => {
      if (error?.status === 401) {
        setMessage("Invalid credentials. Please try again.");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // Manual authorization
    if (userData.length === 0) {
      const users = await getAllUsers();
      const user = users.find((u) => u.username === data.username);
      if (!user || data.password !== "success-password") {
        data.password = "failed-password";
      } else {
        const userindex = users.findIndex((u) => u.username === data.username)!;
        const userWithRole = user as IUserWithRole;
        userWithRole["role"] = roles[userindex];
        updateUser(userWithRole);
      }
      mutation.mutate(data);
    } else {
      const user = userData.find((u) => u.username === data.username);
      if (!user || data.password !== "success-password") {
        setMessage("Invalid credentials. Please try again.");
        return;
      } else {
        updateLoginStatus(true);
        updateCredentials({ username: data.username, password: data.password });
        updateUser(user);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1000);
      }
    }
  };

  return (
    <>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Title />
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Card
          sx={{
            p: 4,
            width: 350,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Username"
              variant="outlined"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ my: 2 }}
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
          {message && (
            <Typography
              color={mutation.isError ? "error" : "success"}
              variant="body2"
            >
              {message}
            </Typography>
          )}
          Dummy Creds: emily_johnson , success-password
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
