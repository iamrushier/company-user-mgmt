import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Companies from "./pages/Companies";
import Roles from "./pages/Roles";
import Blogs from "./pages/Blogs";
import LoginPage from "./pages/LoginPage";
import SidebarLayout from "./components/SidebarLayout";
import UserDetails from "./components/UserDetails";
import CompanyDetails from "./components/CompanyDetails";
import RoleDetails from "./components/RoleDetails";
import CompanyForm from "./components/CompanyForm";
import UserForm from "./components/UserForm";
import Error404 from "./components/Error404";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<SidebarLayout title="Users" />}>
            <Route index element={<Users />} />
            <Route path="add" element={<UserForm />} />
            <Route path="edit/:id" element={<UserForm />} />
            <Route path=":id" element={<UserDetails />} />
          </Route>
          <Route
            path="/companies"
            element={<SidebarLayout title="Companies" />}
          >
            <Route index element={<Companies />} />
            <Route path="add" element={<CompanyForm />} />
            <Route path="edit/:id" element={<CompanyForm />} />
            <Route path=":id" element={<CompanyDetails />} />
          </Route>

          <Route path="/roles" element={<SidebarLayout title="Roles" />}>
            <Route index element={<Roles />} />
            <Route path=":id" element={<RoleDetails />} />
          </Route>

          <Route path="/blogs" element={<Blogs />} />
          <Route path="/profile" element={<LoginPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
