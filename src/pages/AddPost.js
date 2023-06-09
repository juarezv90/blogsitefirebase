import { useAuth } from "@components/AuthContext";
import { db } from "@firebaselib/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/router";
import { useAppContext } from "@context/PostContext";

const initState = {
  post: "",
  title: "",
  slugs: [],
  postImage: "",
  comments:[]
};

const AddPost = () => {
  const [post, setPost] = useState(initState);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const { currentUser } = useAuth();
  const { setPosts } = useAppContext();
  const router = useRouter();

  function redirect() {
    setPosts([]);
    router.push("/");
  }

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

    if (post.title == "" || post.post == "" || imageURL == null) {
      if(imageURL == null){
        setError("Image required for post")
        return;
      }
      setError("Please Check your Post is valid");
      return;
    }

    try {
      await addDoc(docRef, {
        ...post,
        date: Timestamp.now(),
        userId: currentUser.uid,
        postImage: imageURL,
      });
    } catch (error) {
      setError(error);
    } finally {
      if (!error) {
        redirect();
      }
    }
  };

  const handleImageUpload = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    const upload = await uploadBytesResumable(storageRef, file);
    upload;
    setImageURL(await getDownloadURL(storageRef));
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
          id="slugs"
          onChange={(e) => handleSlugs(e)}
          placeholder="Enter each tag starting with #"
          className="outline-none p-1 border rounded-sm"
        />
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={({ target }) => {
            if(target.files.length <=0){
              return;
            }
            setImage(target.files[0]);
            handleImageUpload(target.files[0]);
          }}
        />
        {image && (
          <img src={URL.createObjectURL(image)} alt="" className="w-[200px]" />
        )}
        <div className="flex w-full gap-2 mb-4 justify-center items-center">

        <button
          className="w-full md:w-[25ch] border py-2 rounded-md text-xl duration-300 hover:border-black hover:bg-slate-500 hover:text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="w-full md:w-[25ch] border py-2 rounded-md text-xl duration-300 hover:border-black hover:bg-slate-500 hover:text-white"
          onClick={() => {
            setPost(initState);
            setImage(null);
            setImageURL(null);
            document.getElementById('fileInput').value = "";
            document.getElementById('slugs').value = "";
          }}
        >
          Clear
        </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
