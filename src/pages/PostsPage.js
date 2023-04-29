import { useAuth } from "@components/AuthContext";
import Loading from "@components/Loading";
import { useAppContext } from "@context/PostContext";
import { postDate } from "@modules/dateModules";
import Link from "next/link";
import React, { useEffect } from "react";
import { BsTrashFill } from "react-icons/bs";

const PostsPage = () => {
  const { posts, getPosts, loading, handleDelete } = useAppContext();
  const { currentUser } = useAuth();

  //USEEFFECT TO LOAD POST IF CURRENT POST LENGTH
  //IS EMPTY
  useEffect(() => {
    if (posts.length <= 0) {
      getPosts();
    }
  }, []);

  return (
    <div className="w-full md:max-w-[1200px] justify-center items-center content-center mx-auto grid md:grid-cols-2 gap-2 my-2">
      {loading && <Loading />}
      {posts.length >= 1 &&
        posts
          .sort(function (a, b) {
            //THIS WILL SORT THE POST BY DATE
            return a.date.seconds - b.date.seconds;
          })
          .map((post, id) => {
            return (
              <div
                className="w-full flex flex-col p-2 justify-start items-center relative"
                key={id}
              >
                <Link
                  href={{
                    pathname: "/PostDisplayPage",
                    query: { id: post.id }
                  }}
                  className="relative after:absolute after:w-full after:h-full after:bg-slate-300 after:top-0 after:left-0 after:bg-opacity-50 after:opacity-0 hover:after:opacity-100 after:duration-300 after:md:rounded-md"
                >
                  <img
                    src={post.postImage}
                    alt="Post Image"
                    className={`w-full h-[200px] md:h-[400px] object-cover md:rounded-lg shadow-md shadow-black mb-2 overflow-hidden`}
                  />
                </Link>
                <h3 className="text-3xl font-bold">{post.title}</h3>
                <h4 className="text-gray-400">Posted: {postDate(post)}</h4>
                <div className="w-full relative flex items-center justify-items-start">
                  {currentUser && currentUser.uid == post.userId && (
                    <BsTrashFill
                      className="w-fit ml-5 text-xl cursor-pointer hover:opacity-60"
                      onClick={() => handleDelete(post.id, getPosts)}
                    />
                  )}
                  <Link
                    href={{
                      pathname: "/PostDisplayPage",
                      query: { id: post.id }
                    }}
                    className="w-fit text-center border px-4 py-1 rounded-lg ml-auto border-black   duration-300 relative after:absolute after:w-full after:h-full after:bg-slate-400 after:top-0 after:-left-[100%] after:hover:left-[0%] after:duration-300 overflow-hidden hover:text-white"
                  >
                    <span className="z-[100] relative">Read</span>
                  </Link>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default PostsPage;
