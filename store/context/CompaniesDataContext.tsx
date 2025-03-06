import { createContext, useContext, useReducer } from "react";
import React from "react";
import { ICompany } from "../../types";

type CompanyDataContextType = {
  data: ICompany[];
  dispatch: React.Dispatch<{ type: string; payload?: ICompany[] }>;
};

const reducer = (
  state: ICompany[],
  action: { type: string; payload?: ICompany[] }
) => {
  switch (action.type) {
    case "SET_COMPANIES":
      if (action.payload) return action.payload;
      else return state;
    default:
      return state;
  }
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
