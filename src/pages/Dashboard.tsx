import { Grid2 as Grid, Card, CardContent, Typography } from "@mui/material";
import { People, Business, Work, Article } from "@mui/icons-material";
import Header from "../components/Header";
import { useUsersData } from "../../store/context/UsersDataContext";
import { useEffect, useState } from "react";
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
const initialStats = [
  {
    label: "Users",
    value: "0",
    icon: <People fontSize="large" color="primary" />,
  },
  {
    label: "Companies",
    value: "0",
    icon: <Business fontSize="large" color="secondary" />,
  },
  {
    label: "Roles",
    value: "0",
    icon: <Work fontSize="large" color="success" />,
  },
  {
    label: "Blogs",
    value: "0",
    icon: <Article fontSize="large" color="warning" />,
  },
];

const Dashboard = () => {
  const { data: userData, dispatch: dispatchUserData } = useUsersData();
  const { data: companyData, dispatch: dispatchCompanyData } =
    useCompaniesData();
  const { data: roleData, dispatch: dispatchRoleData } = useRolesData();
  const { data: blogData, dispatch: dispatchBlogData } = useBlogsData();
  const { dispatch: dispatchCommentData } = useCommentsData();

  const [stats, setStats] = useState(initialStats);

  const fetchData = async () => {
    try {
      const userData = (await getAllUsers()) || [];
      const companyData = (await getAllCompanies()) || [];
      const roleData = (await getAllRoles()) || [];
      const blogData = (await getAllBlogs()) || [];
      const commentData = (await getAllComments()) || [];
      const assignedUsers = userData.map((user, index) => ({
        ...user,
        role: roles[index],
      }));
      dispatchUserData({ type: "SET_USERS", payload: assignedUsers });
      dispatchCompanyData({ type: "SET_COMPANIES", payload: companyData });
      dispatchRoleData({ type: "SET_ROLES", payload: roleData });
      dispatchBlogData({ type: "SET_BLOGS", payload: blogData });
      dispatchCommentData({ type: "SET_COMMENTS", payload: commentData });

      return [userData, companyData, roleData, blogData];
    } catch (error) {
      console.error(error);
    }
  };
  useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
    refetchOnMount: false,
  });
  useEffect(() => {
    setStats((prevStats) => {
      return [
        {
          ...prevStats[0],
          value: userData.length.toString(),
        },
        {
          ...prevStats[1],
          value: companyData.length.toString(),
        },
        {
          ...prevStats[2],
          value: roleData.length.toString(),
        },
        {
          ...prevStats[3],
          value: blogData.length.toString(),
        },
      ];
    });
  }, [userData, companyData, roleData, blogData]);

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
