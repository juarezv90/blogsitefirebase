import PostBox from "@components/PostBox";
import { db } from "@firebaselib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const postsCollection = collection(db, "posts");
  const getPosts = async () => {
    try {
      const postsData = await getDocs(postsCollection);
      const tempData = postsData.docs.map((element) => {
        return { id: element.id, ...element.data() };
      });
      setPosts(tempData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="w-full h-full">
      {posts.length < 1 && <h1 className="text-center text-3xl mt-6">No Post to display to display yet</h1>}
      {posts !== null &&
        posts.map((element) => (
          <PostBox data={element} key={element.id} refreshPage={getPosts} />
        ))}
    </main>
  );
}
