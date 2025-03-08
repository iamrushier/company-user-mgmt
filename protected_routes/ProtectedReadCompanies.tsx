import { Navigate, Outlet } from "react-router-dom";
import { useAuthUserStore } from "../store/zustand/AuthUserStore";
import useRoleStore from "../store/zustand/RolesActionsStore";
import React from "react";
const ProtectedReadCompanies = () => {
  const { user } = useAuthUserStore();
  const { roles } = useRoleStore();
  return (
    <>
      {user && roles[user?.role!]["companies"].read ? (
        <Outlet />
      ) : (
        <Navigate to="/not-authorized" />
      )}
    </>
  );
};

export default ProtectedReadCompanies;
