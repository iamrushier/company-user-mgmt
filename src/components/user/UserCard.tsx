import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";

interface UserCardProps {
  id: number;
  name: string;
  company: string;
  email: string;
  role: string;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  company,
  email,
  role,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/${id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64, mb: 1 }}>
        <Person fontSize="large" />
      </Avatar>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {company} | {role}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {email}
        </Typography>
      </CardContent>
      <Box sx={{ mt: 1 }}>
        <Button variant="outlined" color="primary">
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default UserCard;
