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
import { useState } from "react";
import { useAuthUserStore } from "../../store/zustand/AuthUserStore";
import { useMutation } from "@tanstack/react-query";
import { getAllUsers, tryLoginForUser } from "../../api/api_calls";
import { ICredentials, IUser } from "../../types";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { updateLoginStatus, updateCredentials, updateUser } =
    useAuthUserStore();
  const [user, setUser] = useState<Partial<IUser>>({});

  const mutation = useMutation({
    mutationFn: async (credentials: ICredentials) => {
      const response = await tryLoginForUser(credentials);
      return response;
    },
    onSuccess: (data) => {
      updateLoginStatus(data.success);
      updateCredentials(credentials);
      updateUser(user);
      navigate("/");
    },
    onError: (error) => {
      console.log("Error:", error.message);
    },
  });
  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      alert("Please enter username and password!");
      return;
    }
    // Manual authorization
    const users = await getAllUsers();
    const user = users.find((u) => u.username === credentials.username);
    if (!user || credentials.password !== "success-password") {
      credentials.password = "failed-password";
    } else {
      setUser(user);
    }
    mutation.mutate(credentials);
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
          <TextField
            label="Username"
            value={credentials.username}
            variant="outlined"
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <TextField
            label="Password"
            value={credentials.password}
            type="password"
            variant="outlined"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ my: 1 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
