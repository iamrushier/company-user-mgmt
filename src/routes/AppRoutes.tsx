import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import Unauthorized from "../components/Unauthorized";
import Error404 from "../components/Error404";
import UserRoutes from "./UserRoutes";
import CompanyRoutes from "./CompanyRoutes";
import BlogRoutes from "./BlogRoutes";
import RoleRoutes from "./RoleRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      {UserRoutes()}
      {CompanyRoutes()}
      {BlogRoutes()}
      {RoleRoutes()}
      <Route path="/not-authorized" element={<Unauthorized />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRoutes;
