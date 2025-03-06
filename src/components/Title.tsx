import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Title = () => {
  const navigate = useNavigate();
  return (
    <Typography
      variant="h5"
      component="div"
      sx={{ fontWeight: "bold", cursor: "pointer" }}
      onClick={() => navigate("/")}
    >
      CU Manager
    </Typography>
  );
};

export default Title;
