import { createContext, useContext, useReducer } from "react";
import React from "react";
import { IBlog } from "../../types";

type BlogsDataContextType = {
  data: IBlog[];
  dispatch: React.Dispatch<{ type: string; payload?: IBlog[] }>;
};

const reducer = (
  state: IBlog[],
  action: { type: string; payload?: IBlog[] }
) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.payload ? action.payload : state;
    default:
      return state;
  }
};

const BlogsDataContext = createContext<BlogsDataContextType | undefined>(
  undefined
);

export const BlogsDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, dispatch] = useReducer(reducer, []);

  return (
    <BlogsDataContext.Provider value={{ data, dispatch }}>
      {children}
    </BlogsDataContext.Provider>
  );
};

export const useBlogsData = () => {
  const context = useContext(BlogsDataContext);
  if (!context) throw new Error("No context provided");
  return context;
};
