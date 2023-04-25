import { useAuth } from "@components/AuthContext";
import { db } from "@firebaselib/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const initState = {
  post: "",
  title: "",
  slug: [],
  postImage: "",
};

const AddPost = () => {
  const [post, setPost] = useState(initState);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    if (e.target.name == "post") {
      const text = e.target.value.replaceAll("\n", "%0A");
      setPost({ ...post, post: text });
    }
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSlugs = (e) => {
    const slugs = e.target.value
      .split("#")
      .filter((item) => item != "")
      .map((item) => item.trim());
    setPost({ ...post, [e.target.name]: slugs });
  };

  const handleSubmit = async () => {
    const docRef = collection(db, "posts");

    if (post.title == "" || post.postImage == "" || post.post == "") {
      setError("Please Check your Post is valid");
      return;
    }
    try {
      await addDoc(docRef, {
        ...post,
        date: Timestamp.now(),
        userId: currentUser.uid,
      });
    } catch (error) {
      setError(error);
    }
  };

  setTimeout(() => {
    setError(null);
  }, 5000);

  return (
    <div className="w-full flex flex-col text-black">
      <div className="max-w-[1280px] mx-auto sm:w-[70%] flex flex-col gap-2">
        <h1 className="text-2xl font-bold mt-2">Add Post:</h1>
        <p
          className={`p-2 bg-red-300 rounded w-[40ch] text-center mx-auto border border-red-600 ${
            !error ? "hidden" : ""
          }`}
        >
          {error}
        </p>
        <input
          name="title"
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="Title"
          value={post.title}
          className="outline-none p-1 border rounded-sm"
        />
        <textarea
          name="post"
          onChange={(e) => handleChange(e)}
          cols="30"
          rows="10"
          value={post.post}
          placeholder="Type your post"
          className="p-1 outline-none border rounded-sm resize-none"
        ></textarea>
        <input
          type="text"
          name="slugs"
          onChange={(e) => handleSlugs(e)}
          placeholder="Enter each tag starting with #"
          className="outline-none p-1 border rounded-sm"
        />
        <input
          type="text"
          name="postImage"
          onChange={(e) => handleChange(e)}
          placeholder="Image Post URL"
          className="outline-none p-1 border rounded-sm"
        />
        <button
          className="w-[30ch] border mx-auto p-2 rounded-md text-xl hover:bg-slate-500 hover:text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddPost;
