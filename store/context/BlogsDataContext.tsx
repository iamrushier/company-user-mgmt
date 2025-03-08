import { createContext, useContext, useReducer } from "react";
import React from "react";
import { IBlog } from "../../types";

type BlogsDataContextType = {
  data: IBlog[];
  dispatch: React.Dispatch<{ type: string; payload?: IBlog[]; id?: number }>;
};

const reducer = (
  state: IBlog[],
  action: { type: string; payload?: IBlog[]; id?: number }
) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.payload ? action.payload : state;
    case "DELETE_BLOG":
      if (!action.id) return state;
      return state.filter((blog) => blog.id !== action.id);
    case "UPDATE_BLOG":
      if (action.payload && action.payload.length === 1) {
        const updatedBlog = action.payload[0];
        return state.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        );
      } else {
        return state;
      }
    case "ADD_BLOG":
      if (action.payload && action.payload.length === 1) {
        return [...state, action.payload[0]];
      } else {
        return state;
      }
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
