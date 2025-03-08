import { createContext, useContext, useReducer } from "react";
import React from "react";
import { IUser } from "../../types";

type UserDataContextType = {
  data: IUser[];
  dispatch: React.Dispatch<{ type: string; payload?: IUser[]; id?: number }>;
};

const reducer = (
  state: IUser[],
  action: { type: string; payload?: IUser[]; id?: number }
) => {
  switch (action.type) {
    case "SET_USERS":
      if (action.payload) return action.payload;
      else return state;
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
