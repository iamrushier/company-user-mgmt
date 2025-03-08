import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        You are not authorized to access this page. Please log in with
        authorized account.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default Unauthorized;
