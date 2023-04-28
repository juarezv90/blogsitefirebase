import { db } from "@firebaselib/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const PostContext = ({ children }) => {

  const [posts, setPosts] = useState([]);

  const postsCollection = collection(db, "posts");
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    try {
      const postsData = await getDocs(postsCollection);
      const tempData = postsData.docs.map((element) => {
        return { id: element.id, ...element.data() };
      });
      setPosts(tempData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const context = {
    posts,
    setPosts,
    getPosts,
    loading
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default PostContext;

export function useAppContext() {
  return useContext(AppContext);
}
