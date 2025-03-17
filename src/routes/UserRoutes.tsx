import { Route } from "react-router-dom";
import Users from "../pages/Users";
import UserDetails from "../components/user/UserDetails";
import UserForm from "../components/user/UserForm";
import SidebarLayout from "../components/SidebarLayout";
import ProtectedReadUsers from "../protected_routes/ProtectedReadUsers";
import ProtectedWriteUsers from "../protected_routes/ProtectedWriteUsers";

const UserRoutes = () => {
  return (
    <Route element={<ProtectedReadUsers />}>
      <Route path="/users" element={<SidebarLayout title="Users" />}>
        <Route index element={<Users />} />
        <Route element={<ProtectedWriteUsers />}>
          <Route path="add" element={<UserForm />} />
          <Route path="edit/:id" element={<UserForm />} />
        </Route>
        <Route path=":id" element={<UserDetails />} />
      </Route>
    </Route>
  );
};

export default UserRoutes;
