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

const LoginPage = () => {
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
          <TextField label="Username" variant="outlined" />
          <TextField label="Password" type="password" variant="outlined" />
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ my: 1 }}
          >
            Login
          </Button>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
