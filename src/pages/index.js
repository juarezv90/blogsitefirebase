import PostBox from "@components/PostBox";
import { useAppContext } from "@context/PostContext";
import { db } from "@firebaselib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Home() {
  const postsCollection = collection(db, "posts");
  const [loading, setLoading] = useState(false);

  const { posts, setPosts } = useAppContext();

  const getPosts = async () => {
    setLoading(true);
    try {
      const postsData = await getDocs(postsCollection);
      const tempData = postsData.docs.map((element) => {
        return { id: element.id, ...element.data() };
      });
      setPosts(tempData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (posts.length <= 0) {
      getPosts();
    }
  }, []);

  return (
    <main className="w-full h-full">
      {loading && (
        <div className="text-black w-full flex flex-col justify-center items-center mt-4">
          <AiOutlineLoading className="text-4xl font-bold animate-spin" />
          <h1 className="text-xl">loading...</h1>
        </div>
      )}
      {posts.length < 1 && (
        <h1 className="text-center text-3xl mt-6">
          No Post to display to display yet
        </h1>
      )}
      {posts.length > 0 &&
        posts.sort(function(a,b){return a.date-b.date}).map((element) => (
          <PostBox data={element} key={element.id} refreshPage={getPosts} />
        ))}
    </main>
  );
}
