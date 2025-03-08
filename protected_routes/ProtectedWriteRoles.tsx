import { Navigate, Outlet } from "react-router-dom";
import { useAuthUserStore } from "../store/zustand/AuthUserStore";
import useRoleStore from "../store/zustand/RolesActionsStore";
const ProtectedWriteRoles = () => {
  const { user } = useAuthUserStore();
  const { roles } = useRoleStore();
  const userRole =
    user && typeof user === "object" && "role" in user ? user.role : null;
  return (
    <>
      {userRole && roles[userRole]?.roles?.read_write ? (
        <Outlet />
      ) : (
        <Navigate to="/not-authorized" />
      )}
    </>
  );
};

export default ProtectedWriteRoles;
