import React from "react";
import {BsTrashFill} from "react-icons/bs"
import { useAuth } from "./AuthContext";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "@firebaselib/firebase";

const PostBox = ({ data, refreshPage }) => {
  const date = data.date.toDate();
  const postDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  const {currentUser} = useAuth();

  const handleDelete = async(id) => {
    try {
      await deleteDoc(doc(db, "messages", id));
      refreshPage();
    } catch (error) {
      console.error(error)
    }

    
  }

  return (
    <div className="w-full flex flex-col justify-center items-center md:flex-row gap-2 my-2 p-2">
      <div className="w-full mx-2">
        <img src={data.postImage} className="w-full h-[200px] object-cover"/>
      </div>

      <div className="w-full h-full flex flex-col justify-end relative">
        <h2 className="font-bold text-3xl md:text-4xl">{data.title}</h2>
        <span className="text-gray-400">Posted: {postDate}</span>
        <p className="md:w-[40ch] mb-auto whitespace-pre-line">{`${data.post.substring(0, 100).replaceAll("\\n", "\n")}`}... <a href="/" className="font-semibold text-slate-500">Read More</a></p>
        
        <div className="flex gap-2">
            Tags:
            {data.slugs.map((slug, id )=> <p key={id}>#{slug}</p>)}
        </div>
        {currentUser && <BsTrashFill className="ml-auto mr-5 text-xl" onClick={() => handleDelete(data.id)} />}
      </div>
    </div>
  );
};

export default PostBox;
