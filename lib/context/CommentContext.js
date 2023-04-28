import { db } from "@firebaselib/firebase";
import { doc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";

const CommentContext = createContext();

export const Comments = ({ children }) => {
  const [id, setId] = useState(null);

  const postComment = async (comment, post) => {
    const posts = doc(db, 'posts', id);

    console.log(post)

    try {
      await setDoc(posts, {
        ...post,
        comments:[...post.comments, comment]
      }, {merge:true});
    } catch (error) {
        console.error(error)
    }
  };

  const values = { setId, postComment };

  return (
    <CommentContext.Provider value={values}>{children}</CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  return useContext(CommentContext);
};
