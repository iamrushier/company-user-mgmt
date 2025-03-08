import { Navigate, Outlet } from "react-router-dom";
import { useAuthUserStore } from "../store/zustand/AuthUserStore";
import useRoleStore from "../store/zustand/RolesActionsStore";
const ProtectedReadUsers = () => {
  const { user } = useAuthUserStore();
  const { roles } = useRoleStore();
  return (
    <>
      {user && roles[user?.role!]["users"].read ? (
        <Outlet />
      ) : (
        <Navigate to="/not-authorized" />
      )}
    </>
  );
};

export default ProtectedReadUsers;
