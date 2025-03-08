import { create } from "zustand";
import { IUserWithRole } from "../context/UsersDataContext";
type AuthUserStore = {
  isLoggedIn: boolean;
  credentials?: {
    username: string;
    password: string;
  };
  user?: Partial<IUserWithRole>;
  updateLoginStatus: (status: boolean) => void;
  updateCredentials: (credentials: {
    username: string;
    password: string;
  }) => void;
  updateUser: (user: Partial<IUserWithRole>) => void;
};

export const useAuthUserStore = create<AuthUserStore>((set) => ({
  isLoggedIn: false,
  user: undefined,
  updateLoginStatus: (status) => set({ isLoggedIn: status }),
  updateCredentials: (credentials) => set({ credentials }),
  updateUser: (user) => set({ user }),
}));
