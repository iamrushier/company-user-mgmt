import {
  Card,
  CardActionArea,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICompany } from "../../types";
import { Business } from "@mui/icons-material";

const CompanyCard = ({ company }: { company: ICompany }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      <CardActionArea onClick={() => navigate(`/companies/${company.id}`)}>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              sx={{ bgcolor: "primary.main", width: 56, height: 56, mr: 2 }}
            >
              <Business fontSize="large" sx={{ color: "white" }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="h6" fontWeight="bold" component="span">
                {company.name}
              </Typography>
            }
            secondary={
              <>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="span"
                >
                  Industry: {company.industry} | Employees:{" "}
                  {company.employeeCount}
                </Typography>
                <br />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="span"
                >
                  CEO: {company.ceoName} | Market Cap: $
                  {company.marketCap.toLocaleString()}
                </Typography>
              </>
            }
          />
        </ListItem>
      </CardActionArea>
    </Card>
  );
};

export default CompanyCard;
