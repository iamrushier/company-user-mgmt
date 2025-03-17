import { Route } from "react-router-dom";
import ProtectedWriteRoles from "../protected_routes/ProtectedWriteRoles";
import SidebarLayout from "../components/SidebarLayout";
import Roles from "../pages/Roles";
import RoleDetails from "../components/role/RoleDetails";

const RoleRoutes = () => {
  return (
    <Route element={<ProtectedWriteRoles />}>
      <Route path="/roles" element={<SidebarLayout title="Roles" />}>
        <Route index element={<Roles />} />
        <Route path=":id" element={<RoleDetails />} />
      </Route>
    </Route>
  );
};

export default RoleRoutes;
