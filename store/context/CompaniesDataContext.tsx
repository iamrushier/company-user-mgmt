import { createContext, useContext, useReducer } from "react";
import React from "react";
import { ICompany } from "../../types";

type CompanyDataContextType = {
  data: ICompany[];
  dispatch: React.Dispatch<{ type: string; payload?: ICompany[]; id?: number }>;
};

const reducer = (
  state: ICompany[],
  action: { type: string; payload?: ICompany[]; id?: number }
) => {
  switch (action.type) {
    case "SET_COMPANIES":
      if (action.payload) return action.payload;
      else return state;
    case "ADD_COMPANY":
      if (action.payload && action.payload.length === 1)
        return [...state, ...action.payload];
      else return state;
    case "UPDATE_COMPANY":
      if (action.payload && action.payload.length === 1) {
        const updatedUser = action.payload[0];
        return state.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      } else return state;
    case "DELETE_COMPANY":
      if (action.id) return state.filter((user) => user.id !== action.id);
  }
  return state;
};

const CompaniesDataContext = createContext<CompanyDataContextType | undefined>(
  undefined
);

export const CompaniesDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, dispatch] = useReducer(reducer, []);

  return (
    <CompaniesDataContext.Provider value={{ data, dispatch }}>
      {children}
    </CompaniesDataContext.Provider>
  );
};

export const useCompaniesData = () => {
  const context = useContext(CompaniesDataContext);
  if (!context) throw new Error("No context provided");
  return context;
};
