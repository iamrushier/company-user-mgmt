import { Grid2 as Grid, Card, CardContent, Typography } from "@mui/material";
import { People, Business, Work, Article } from "@mui/icons-material";
import Header from "../components/Header";

const stats = [
  {
    label: "Users",
    value: "00",
    icon: <People fontSize="large" color="primary" />,
  },
  {
    label: "Companies",
    value: "00",
    icon: <Business fontSize="large" color="secondary" />,
  },
  {
    label: "Roles",
    value: "00",
    icon: <Work fontSize="large" color="success" />,
  },
  {
    label: "Blogs",
    value: "00",
    icon: <Article fontSize="large" color="warning" />,
  },
];

const Dashboard = () => {
  return (
    <>
      <Header />
      <Grid container spacing={3} sx={{ m: 3 }}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 6, md: 6 }} key={index} component={Card}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                {stat.icon}
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography color="textSecondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
