import Layout from "@/components/layout/Layout";
import AuthContext, { AuthContextProvider } from "@/store/auth-context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
