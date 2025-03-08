import { createContext, useContext, useReducer } from "react";
import React from "react";
import { IUser } from "../../types";

export interface IUserWithRole extends IUser {
  role: string;
}
type UserDataContextType = {
  data: IUserWithRole[];
  dispatch: React.Dispatch<{
    type: string;
    payload?: IUserWithRole[];
    id?: number;
  }>;
};

const reducer = (
  state: IUserWithRole[],
  action: { type: string; payload?: IUserWithRole[]; id?: number }
) => {
  switch (action.type) {
    case "SET_USERS":
      if (action.payload) return action.payload;
      else return state;
    case "ADD_USER":
      if (action.payload && action.payload.length === 1)
        return [...state, ...action.payload];
      else return state;
    case "UPDATE_USER":
      if (action.payload && action.payload.length === 1) {
        const updatedUser = action.payload[0];
        return state.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      } else return state;
    case "DELETE_USER":
      if (action.id) return state.filter((user) => user.id !== action.id);
  }
  return state;
};

const UsersDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export const UsersDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, dispatch] = useReducer(reducer, []);

  return (
    <UsersDataContext.Provider value={{ data, dispatch }}>
      {children}
    </UsersDataContext.Provider>
  );
};

export const useUsersData = () => {
  const context = useContext(UsersDataContext);
  if (!context) throw new Error("No context provided");
  return context;
};
