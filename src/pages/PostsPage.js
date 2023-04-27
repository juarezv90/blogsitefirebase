import { useAppContext } from "@context/PostContext";
import Link from "next/link";
import React from "react";

const PostsPage = () => {
  const { posts } = useAppContext();

  const createDate = (date) => {
    let revisedDate = date.toDate();
    revisedDate =
      revisedDate.getMonth() +
      1 +
      "/" +
      revisedDate.getDate() +
      "/" +
      revisedDate.getFullYear();
    return revisedDate;
  };
 
  return (
    <div className="w-full md:max-w-[1200px] mx-auto grid md:grid-cols-2 gap-2">
      {posts.length >= 1 &&
        posts.sort(function(a,b){ return a.date.seconds-b.date.seconds}).map((post, id) => {
          return (
            <div className="flex flex-col p-2 justify-start items-center" key={id}>
              <img
                src={post.postImage}
                alt="Post Image"
                className="w-full h-[400px] object-cover rounded-sm"
              />
              <h3 className="text-3xl font-bold">{post.title}</h3>
              <h4 className="text-gray-400">Posted: {createDate(post.date)}</h4>
              <Link
                href={{ pathname: "/PostDisplayPage", query: { id: post.id } }}
                className="text-center border px-4 py-1 rounded-lg ml-auto border-black   duration-300 relative after:absolute after:w-full after:h-full after:bg-slate-400 after:top-0 after:-left-[100%] after:hover:left-[0%] after:duration-700 overflow-hidden hover:text-white"
              >
                <span className="z-[100] relative">Read</span>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default PostsPage;
