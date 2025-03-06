import { createContext, useContext, useReducer } from "react";
import React from "react";
import { IRole } from "../../types";

type RolesDataContextType = {
  data: IRole[];
  dispatch: React.Dispatch<{ type: string; payload?: IRole[] }>;
};

const reducer = (
  state: IRole[],
  action: { type: string; payload?: IRole[] }
) => {
  switch (action.type) {
    case "SET_ROLES":
      return action.payload ? action.payload : state;
    default:
      return state;
  }
};

const RolesDataContext = createContext<RolesDataContextType | undefined>(
  undefined
);

export const RolesDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, dispatch] = useReducer(reducer, []);

  return (
    <RolesDataContext.Provider value={{ data, dispatch }}>
      {children}
    </RolesDataContext.Provider>
  );
};

export const useRolesData = () => {
  const context = useContext(RolesDataContext);
  if (!context) throw new Error("No context provided");
  return context;
};
