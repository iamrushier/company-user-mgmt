import { Container, List } from "@mui/material";
import { useBlogsData } from "../../store/context/BlogsDataContext";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../../api/api_calls";
import BlogCard from "../components/BlogCard";
const Blogs = () => {
  const { data: blogData, dispatch } = useBlogsData();

  const fetchBlogData = async () => {
    if (blogData.length > 0) return blogData;
    try {
      const fetchedData = await getAllBlogs();
      dispatch({ type: "SET_BLOGS", payload: fetchedData });
      return fetchedData;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }
  };

  useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogData,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Container>
      <List>
        {blogData.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </List>
    </Container>
  );
};

export default Blogs;
