import Layout from "@/components/layout/Layout";
import AuthContext, { AuthContextProvider } from "@/store/auth-context";
import "@/styles/globals.css";
import { EventContextProvider } from "@/store/events-context";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <EventContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </EventContextProvider>
    </AuthContextProvider>
  );
}
