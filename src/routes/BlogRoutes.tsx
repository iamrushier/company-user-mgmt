import { Route } from "react-router-dom";
import SidebarLayout from "../components/SidebarLayout";
import ProtectedReadBlogs from "../protected_routes/ProtectedReadBlogs";
import Blogs from "../pages/Blogs";
import ProtectedWriteBlogs from "../protected_routes/ProtectedWriteBlogs";
import BlogForm from "../components/blog/BlogForm";
import BlogDetails from "../components/blog/BlogDetails";

const BlogRoutes = () => {
  return (
    <Route element={<ProtectedReadBlogs />}>
      <Route path="/blogs" element={<SidebarLayout title="Blogs" />}>
        <Route index element={<Blogs />} />
        <Route element={<ProtectedWriteBlogs />}>
          <Route path="add" element={<BlogForm />} />
          <Route path="edit/:id" element={<BlogForm />} />
        </Route>
        <Route path=":id" element={<BlogDetails />} />
      </Route>
    </Route>
  );
};

export default BlogRoutes;
