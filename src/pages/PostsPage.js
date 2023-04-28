import { useAppContext } from "@context/PostContext";
import Link from "next/link";
import React, { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const PostsPage = () => {
  const { posts, getPosts, loading } = useAppContext();

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

  useEffect(() => {
    if (posts.length <= 0) {
      getPosts();
    }
  }, []);
 
  return (
    <div className="w-full md:max-w-[1200px] justify-center items-center content-center mx-auto grid md:grid-cols-2 gap-2">
      {loading && (
        <div className="text-black w-full flex flex-col justify-center items-center mt-4 col-span-2 my-10">
          <AiOutlineLoading className="text-[4rem] font-bold animate-spin " />
          <h1 className="text-xl">loading...</h1>
        </div>
      )}
      {posts.length >= 1 &&
        posts.sort(function(a,b){ return a.date.seconds-b.date.seconds}).map((post, id) => {
          return (
            <div className="w-full flex flex-col p-2 justify-start items-center" key={id}>
              <img
                src={post.postImage}
                alt="Post Image"
                className="w-full h-[200px] md:h-[400px] object-cover rounded-sm"
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
