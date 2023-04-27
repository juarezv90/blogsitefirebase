import "@/styles/globals.css";
import Layout from "@/pages/Layout";
import { AuthProvider } from "@components/AuthContext";
import PostContext from "@context/PostContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PostContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PostContext>
    </AuthProvider>
  );
}
