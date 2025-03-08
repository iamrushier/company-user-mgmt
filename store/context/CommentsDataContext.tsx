import { createContext, useContext, useReducer } from "react";
import React from "react";
import { IComment } from "../../types";

type CommentsDataContextType = {
  data: IComment[];
  dispatch: React.Dispatch<{ type: string; payload?: IComment[]; id?: number }>;
};

const reducer = (
  state: IComment[],
  action: { type: string; payload?: IComment[]; id?: number }
) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return action.payload ? action.payload : state;
    case "DELETE_COMMENT":
      if (!action.id) return state;
      return state.filter((comment) => comment.id !== action.id);
    default:
      return state;
  }
};

const CommentsDataContext = createContext<CommentsDataContextType | undefined>(
  undefined
);

export const CommentsDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, dispatch] = useReducer(reducer, []);

  return (
    <CommentsDataContext.Provider value={{ data, dispatch }}>
      {children}
    </CommentsDataContext.Provider>
  );
};

export const useCommentsData = () => {
  const context = useContext(CommentsDataContext);
  if (!context) throw new Error("No context provided");
  return context;
};
