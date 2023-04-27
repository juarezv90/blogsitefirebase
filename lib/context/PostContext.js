import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const PostContext = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const context = {
    posts,
    setPosts,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default PostContext;

export function useAppContext() {
  return useContext(AppContext);
}
