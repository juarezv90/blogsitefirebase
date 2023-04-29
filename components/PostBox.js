import React from "react";
import { BsTrashFill } from "react-icons/bs";
import { useAuth } from "./AuthContext";
import Link from "next/link";
import { postDate } from "@modules/dateModules";
import { useAppContext } from "@context/PostContext";

const PostBox = ({ data, refreshPage }) => {
  const { currentUser } = useAuth();
  const { handleDelete } = useAppContext();

  return (
    <div className="w-full flex flex-col justify-center items-center md:flex-row gap-2 my-2 p-2">
      <div className="w-full mx-2 ">
        <Link
          href={{
            pathname: "/PostDisplayPage",
            query: { id: data.id }
          }}
         
        >
          <img src={data.postImage} className="w-full h-[200px] sm:h-[300px] md:h-[200px] object-cover hover:shadow-lg hover:shadow-slate-500 duration-300" />
        </Link>
      </div>

      <div className="w-full h-full flex flex-col justify-end relative">
        <h2 className="font-bold text-3xl md:text-4xl text-center md:text-start">{data.title}</h2>
        <span className="text-gray-400 text-sm mb-4 text-center md:text-start">Posted: {postDate(data)}</span>
        <p className="md:w-[40ch] mb-auto whitespace-pre-line">
          {`${data.post.substring(0, 150).replaceAll("\\n", "\n")}` +
            (data.post.length >= 150 ? "... " : " ")}
          <Link
            href={{
              pathname: "/PostDisplayPage",
              query: { id: data.id }
            }}
            className="font-semibold text-slate-500 ml-[20px] animate-pulse duration-75"
          >
            Read More
          </Link>
        </p>

        <div className="flex gap-2 justify-center flex-wrap mt-4">
          Tags:
          {data.slugs.map((slug, id) => (
            <p key={id}>#{slug}</p>
          ))}
        </div>
        {currentUser && currentUser.uid == data.userId && (
          <BsTrashFill
            className="ml-auto mr-5 text-xl cursor-pointer hover:opacity-60"
            onClick={() => handleDelete(data.id, refreshPage)}
          />
        )}
      </div>
    </div>
  );
};

export default PostBox;
