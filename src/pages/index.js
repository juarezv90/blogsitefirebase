import Loading from "@components/Loading";
import PostBox from "@components/PostBox";
import { useAppContext } from "@context/PostContext";
import { useEffect } from "react";

export default function Home() {
  const { posts, getPosts, loading } = useAppContext();

  useEffect(() => {
    if (posts.length <= 0) {
      getPosts();
    }
  }, []);

  return (
    <main className="w-full h-full">
        {loading && (
          <Loading />
        )}
        {posts.length < 1 && (
          <h1 className="text-center text-3xl mt-6">
            No Post to display to display yet
          </h1>
        )}
        {posts.length > 0 &&
          posts
            .sort(function (a, b) {
              return b.date - a.date;
            })
            .map((element) => (
              <PostBox data={element} key={element.id} refreshPage={getPosts} />
            ))}
    </main>
  );
}
