import { useAppContext } from "@context/PostContext";
import { db } from "@firebaselib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PostDisplayPage = () => {
  const [postData, setPostData] = useState(null);
  const router = useRouter();
  const id = router.query;

  const { posts } = useAppContext();

  useEffect(() => {
    if (posts.length > 0) {
      const data = posts.filter((item) => {
        return item.id == id.id;
      });
      setPostData(data[0]);
      return;
    }

    // handle if posts are empty
    const docRef = doc(db, "posts", id.id);
    const handleGetPost = async () => {
      const postDoc = await getDoc(docRef);
      setPostData(postDoc.data());
    };

    if (posts <= 0 || null) {
      handleGetPost();
    }
  }, []);

  let date = postData?.date.toDate();
  date =
    date?.getMonth() + 1 + "/" + date?.getDate() + "/" + date?.getFullYear();
  return (
    <div className="w-full pt-2 md:p-2 mb-5">
      {postData && (
        <div className="flex flex-col max-w-[1280px] w-full md:w-[70%] mx-auto gap-1 md:px-2">
          <img
            src={postData.postImage}
            alt="post header"
            className="md:rounded-md w-full object-cover md:h-[400px] mx-auto"
          />
          <div className="w-full min-h-[200px] px-2">
            <h1 className="font-bold text-2xl md:text-4xl">{postData.title}</h1>
            <h2 className="text-gray-400">Posted: {date}</h2>
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
        </div>
      )}
    </div>
  );
};

export default PostDisplayPage;
