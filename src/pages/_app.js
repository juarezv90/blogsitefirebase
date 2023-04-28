import "@/styles/globals.css";
import Layout from "@/pages/Layout";
import { AuthProvider } from "@components/AuthContext";
import PostContext from "@context/PostContext";
import { Poppins } from "next/font/google";
import { Comments } from "@context/CommentContext";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PostContext>
        <Comments>
          <style jsx global>{`
            html {
              font-family: ${poppins.style.fontFamily};
            }
          `}</style>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Comments>
      </PostContext>
    </AuthProvider>
  );
}
