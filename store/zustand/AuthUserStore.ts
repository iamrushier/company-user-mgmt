import { create } from "zustand";
import { IUser } from "../../types";
type AuthUserStore = {
  isLoggedIn: boolean;
  credentials?: {
    username: string;
    password: string;
  };
  user?: Partial<IUser>;
  updateLoginStatus: (status: boolean) => void;
  updateCredentials: (credentials: {
    username: string;
    password: string;
  }) => void;
  updateUser: (user: Partial<IUser>) => void;
};

export const useAuthUserStore = create<AuthUserStore>((set) => ({
  isLoggedIn: false,
  updateLoginStatus: (status) => set({ isLoggedIn: status }),
  updateCredentials: (credentials) => set({ credentials }),
  updateUser: (user) => set({ user }),
}));
