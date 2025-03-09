import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Companies from "./pages/Companies";
import Roles from "./pages/Roles";
import Blogs from "./pages/Blogs";
import LoginPage from "./pages/LoginPage";
import SidebarLayout from "./components/SidebarLayout";
import UserDetails from "./components/user/UserDetails";
import CompanyDetails from "./components/company/CompanyDetails";
import RoleDetails from "./components/role/RoleDetails";
import CompanyForm from "./components/company/CompanyForm";
import UserForm from "./components/user/UserForm";
import Error404 from "./components/Error404";
import { UsersDataProvider } from "../store/context/UsersDataContext";
import { CompaniesDataProvider } from "../store/context/CompaniesDataContext";
import { RolesDataProvider } from "../store/context/RolesDataContext";
import { BlogsDataProvider } from "../store/context/BlogsDataContext";
import { CommentsDataProvider } from "../store/context/CommentsDataContext";
import BlogDetails from "./components/blog/BlogDetails";
import BlogForm from "./components/blog/BlogForm";
import Unauthorized from "./components/Unauthorized";
import ProtectedReadUsers from "../protected_routes/ProtectedReadUsers";
import ProtectedWriteUsers from "../protected_routes/ProtectedWriteUsers";
import ProtectedReadCompanies from "../protected_routes/ProtectedReadCompanies";
import ProtectedWriteCompanies from "../protected_routes/ProtectedWriteCompanies";
import ProtectedReadBlogs from "../protected_routes/ProtectedReadBlogs";
import ProtectedWriteBlogs from "../protected_routes/ProtectedWriteBlogs";
import ProtectedWriteRoles from "../protected_routes/ProtectedWriteRoles";
function App() {
  return (
    <>
      <CompaniesDataProvider>
        <RolesDataProvider>
          <BlogsDataProvider>
            <CommentsDataProvider>
              <UsersDataProvider>
                <BrowserRouter>
                  {/* <Header /> */}
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<ProtectedReadUsers />}>
                      <Route
                        path="/users"
                        element={<SidebarLayout title="Users" />}
                      >
                        <Route index element={<Users />} />
                        <Route element={<ProtectedWriteUsers />}>
                          <Route path="add" element={<UserForm />} />
                          <Route path="edit/:id" element={<UserForm />} />
                        </Route>

                        <Route path=":id" element={<UserDetails />} />
                      </Route>
                    </Route>

                    <Route element={<ProtectedReadCompanies />}>
                      <Route
                        path="/companies"
                        element={<SidebarLayout title="Companies" />}
                      >
                        <Route index element={<Companies />} />
                        <Route element={<ProtectedWriteCompanies />}>
                          <Route path="add" element={<CompanyForm />} />
                          <Route path="edit/:id" element={<CompanyForm />} />
                        </Route>
                        <Route path=":id" element={<CompanyDetails />} />
                      </Route>
                    </Route>
                    <Route element={<ProtectedReadBlogs />}>
                      <Route
                        path="/blogs"
                        element={<SidebarLayout title="Blogs" />}
                      >
                        <Route index element={<Blogs />} />
                        <Route element={<ProtectedWriteBlogs />}>
                          <Route path="add" element={<BlogForm />} />
                          <Route path="edit/:id" element={<BlogForm />} />
                        </Route>
                        <Route path=":id" element={<BlogDetails />} />
                      </Route>
                    </Route>

                    <Route element={<ProtectedWriteRoles />}>
                      <Route
                        path="/roles"
                        element={<SidebarLayout title="Roles" />}
                      >
                        <Route index element={<Roles />} />
                        <Route path=":id" element={<RoleDetails />} />
                      </Route>
                    </Route>

                    <Route path="/profile" element={<LoginPage />} />

                    <Route path="/not-authorized" element={<Unauthorized />} />
                    <Route path="*" element={<Error404 />} />
                  </Routes>
                </BrowserRouter>
              </UsersDataProvider>
            </CommentsDataProvider>
          </BlogsDataProvider>
        </RolesDataProvider>
      </CompaniesDataProvider>
    </>
  );
}

export default App;
