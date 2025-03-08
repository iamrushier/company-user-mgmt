import { create } from "zustand";

interface Permissions {
  read: boolean;
  read_write: boolean;
}

interface Roles {
  [roleName: string]: {
    users: Permissions;
    companies: Permissions;
    blogs: Permissions;
    roles: Permissions;
  };
}

interface RoleStore {
  roles: Roles;
  updateRole: (roleName: string, updatedPermissions: Roles[string]) => void;
  addRole: (roleName: string, permissions: Roles[string]) => void;
  deleteRole: (roleName: string) => void;
}

const initialRoles: Roles = {
  Admin: {
    users: { read: true, read_write: true },
    companies: { read: true, read_write: true },
    blogs: { read: true, read_write: true },
    roles: { read: false, read_write: true },
  },
  Manager: {
    users: { read: true, read_write: false },
    companies: { read: true, read_write: true },
    blogs: { read: true, read_write: true },
    roles: { read: false, read_write: false },
  },
  User: {
    users: { read: false, read_write: false },
    companies: { read: true, read_write: false },
    blogs: { read: true, read_write: false },
    roles: { read: false, read_write: false },
  },
  Moderator: {
    users: { read: true, read_write: false },
    companies: { read: true, read_write: false },
    blogs: { read: true, read_write: true },
    roles: { read: false, read_write: false },
  },
  Support: {
    users: { read: true, read_write: false },
    companies: { read: true, read_write: false },
    blogs: { read: false, read_write: false },
    roles: { read: false, read_write: false },
  },
};

const useRoleStore = create<RoleStore>((set) => ({
  roles: initialRoles,

  updateRole: (roleName, updatedPermissions) =>
    set((state) => ({
      roles: { ...state.roles, [roleName]: updatedPermissions },
    })),

  addRole: (roleName, permissions) =>
    set((state) => ({
      roles: { ...state.roles, [roleName]: permissions },
    })),

  deleteRole: (roleName) =>
    set((state) => {
      const newRoles = { ...state.roles };
      delete newRoles[roleName];
      return { roles: newRoles };
    }),
}));

export default useRoleStore;
