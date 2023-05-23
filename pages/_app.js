import Layout from "@/components/layout/Layout";
import { AuthContextProvider } from "@/store/auth-context";
import "@/styles/globals.css";
import { EventContextProvider } from "@/store/events-context";
import { RegistrationCartContextProvider } from "@/store/registration-cart-context";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <EventContextProvider>
        <RegistrationCartContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RegistrationCartContextProvider>
      </EventContextProvider>
    </AuthContextProvider>
  );
}
