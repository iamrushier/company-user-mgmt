import { Navigate, Outlet } from "react-router-dom";
import { useAuthUserStore } from "../store/zustand/AuthUserStore";
import useRoleStore from "../store/zustand/RolesActionsStore";
import React from "react";
const ProtectedReadBlogs = () => {
  const { user } = useAuthUserStore();
  const { roles } = useRoleStore();
  return (
    <>
      {user && roles[user?.role!]["blogs"].read ? (
        <Outlet />
      ) : (
        <Navigate to="/not-authorized" />
      )}
    </>
  );
};

export default ProtectedReadBlogs;
