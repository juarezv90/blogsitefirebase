import { useCommentContext } from "@context/CommentContext";
import { useAppContext } from "@context/PostContext";
import { db } from "@firebaselib/firebase";
import { getDate, postDate } from "@modules/dateModules";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PostDisplayPage = () => {
  const [postData, setPostData] = useState(null);
  const [addComment, setAddComment] = useState(false);

  //TODO: needs to move to separate component
  const [todayDate, setTodayDate] = useState("");
  const [comment, setComment] = useState("");

  //USING ROUTER FOR GETTING DOCUMENT ID
  //USED IF CLIENT REFRESHES PAGE
  const router = useRouter();
  const id = router.query;

  //CONTEXT IMPORTS USED THROUGHOUT PROGRAM
  const { posts } = useAppContext();
  const { setId, postComment } = useCommentContext();

  const regExp = new RegExp("Posted");

  //USED TO LOAD POST IF PAGE IS REFRESHED
  //ELSE PAGE SHOULD ALREADY BE LOADED FROM HOMEPAGE LOAD
  const docRef = doc(db, "posts", id.id);
  const handleGetPost = async () => {
    const postDoc = await getDoc(docRef);
    setPostData(postDoc.data());
  };

  //USE EFFECT WILL EITHER GET THE POST FROM THE LOADED
  //POST OR WILL RETRIEVE THE POST BASE ON THE QUERY ID
  useEffect(() => {

    if (posts.length > 0) {//THIS VERIFIES THAT THERE IS DATA IN THE POST
      const data = posts.filter((item) => {
        return item.id == id.id;
      });
      setPostData(data[0]);
      return;
    }

    if (posts <= 0 || null) {
      handleGetPost();
    }
  }, []);

  return (
    <div className="w-full pt-2 md:p-2 mb-5">
      {postData && (
        <div className="flex flex-col max-w-[1280px] w-full md:w-[70%] mx-auto gap-1 md:px-2">
          <img
            src={postData.postImage}
            alt="post header"
            className="md:rounded-md w-full object-cover md:h-[400px] mx-auto shadow-slate-500 shadow-lg"
          />
          <div className="w-full min-h-[200px] px-2 mb-10">
            <h1 className="font-bold text-2xl md:text-4xl mt-2">{postData.title}</h1>
            <h2 className="text-gray-400">Posted: {postDate(postData)}</h2>
            {postData.post.split("\n").map((post, id) => (
              <p className="mt-[1rem]" key={id}>
                <span className="ml-[30px]"></span>
                {post}
              </p>
            ))}
          </div>
          <div className="px-2 flex gap-1 flex-grow justify-center items-center my-2 flex-wrap">
            Tags:
            {postData.slugs.map((slug, id) => (
              <p
                key={id}
                className="text-base mx-1 px-2 border border-gray-400 rounded-lg"
              >
                #{slug}
              </p>
            ))}
          </div>
          {postData.comments.length > 0 && (
            <div className="flex flex-col gap-2 w-full">
              Comments:
              {postData.comments.map((comment, id) => (
                <div
                  key={id}
                  className="border p-2 rounded-xl whitespace-pre-line flex flex-col"
                >
                  <span>
                    {comment.substring(0, comment.match(regExp).index)}
                  </span>
                  <span className="w-fit ml-auto mr-2 text-sm text-gray-400">
                    --
                    {comment.substring(
                      comment.match(regExp).index,
                      comment.length
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
          <button
            className="border w-[15ch] py-2 ml-auto rounded duration-300 relative after:absolute after:w-full after:h-full after:bg-slate-400 after:top-0 after:-left-[100%] after:hover:left-[0%] after:duration-700 overflow-hidden hover:text-white"
            onClick={() => {
              setAddComment(true);
              setTodayDate(getDate());
              setId(postData.id);
            }}
          >
            <span
              className="z-[100] relative"
              onClick={() => setId(postData.id)}
            >
              Add Comment
            </span>
          </button>
        </div>
      )}
      {postData && addComment && (
        <div className="border mt-5 flex flex-col p-5 gap-2 md:w-[75%] mx-auto">
          Comment:
          <textarea
            className="w-full h-[25ch] resize-none border rounded-lg outline-none p-2"
            onChange={({ target }) => setComment(target.value)}
          ></textarea>
          <span className="w-[25ch] ml-auto text-gray-500 text-right">
            Character Count:{" "}
            <span
              className={comment.length > 200 ? "text-red-600 font-bold" : ""}
            >
              {comment.length}/200
            </span>
          </span>
          <button
            className="border w-[20ch] py-2 ml-auto rounded duration-300 relative after:absolute after:w-full after:h-full after:bg-slate-400 after:top-0 after:-left-[100%] after:hover:left-[0%] after:duration-700 overflow-hidden hover:text-white"
            disabled={comment.length > 200}
            onClick={() => {
              postComment(comment + todayDate, postData);
              handleGetPost();
              setComment("");
              setAddComment(false);
            }}
          >
            <span className={"z-[100] relative "}>Submit</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDisplayPage;
