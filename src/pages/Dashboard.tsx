import { Grid2 as Grid, Card, CardContent, Typography } from "@mui/material";
import { People, Business, Work, Article } from "@mui/icons-material";
import Header from "../components/Header";
import { useUsersData } from "../../store/context/UsersDataContext";
import {
  getAllBlogs,
  getAllComments,
  getAllCompanies,
  getAllRoles,
  getAllUsers,
} from "../../api/api_calls";
import { useQuery } from "@tanstack/react-query";
import { useCompaniesData } from "../../store/context/CompaniesDataContext";
import { useRolesData } from "../../store/context/RolesDataContext";
import { useBlogsData } from "../../store/context/BlogsDataContext";
import { useCommentsData } from "../../store/context/CommentsDataContext";
import { roles } from "../../store/constants/roles";

const Dashboard = () => {
  const { data: userData, dispatch: dispatchUserData } = useUsersData();
  const { data: companyData, dispatch: dispatchCompanyData } =
    useCompaniesData();
  const { data: roleData, dispatch: dispatchRoleData } = useRolesData();
  const { data: blogData, dispatch: dispatchBlogData } = useBlogsData();
  const { dispatch: dispatchCommentData } = useCommentsData();

  const fetchData = async () => {
    try {
      const [users, companies, rolesData, blogs, comments] = await Promise.all([
        getAllUsers(),
        getAllCompanies(),
        getAllRoles(),
        getAllBlogs(),
        getAllComments(),
      ]);
      const assignedUsers = users.map((user, index) => ({
        ...user,
        role: roles[index],
      }));
      dispatchUserData({ type: "SET_USERS", payload: assignedUsers });
      dispatchCompanyData({ type: "SET_COMPANIES", payload: companies });
      dispatchRoleData({ type: "SET_ROLES", payload: rolesData });
      dispatchBlogData({ type: "SET_BLOGS", payload: blogs });
      dispatchCommentData({ type: "SET_COMMENTS", payload: comments });

      return { users, companies, rolesData, blogs };
    } catch (error) {
      console.error(error);
    }
  };
  useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchData,
    refetchOnMount: false,
  });

  const stats = [
    {
      label: "Users",
      value: userData.length.toString(),
      icon: <People fontSize="large" color="primary" />,
    },
    {
      label: "Companies",
      value: companyData.length.toString(),
      icon: <Business fontSize="large" color="secondary" />,
    },
    {
      label: "Roles",
      value: roleData.length.toString(),
      icon: <Work fontSize="large" color="success" />,
    },
    {
      label: "Blogs",
      value: blogData.length.toString(),
      icon: <Article fontSize="large" color="warning" />,
    },
  ];

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
