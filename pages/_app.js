import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
// import { initMercadoPago } from "@mercadopago/sdk-react";

// initMercadoPago(process.env.MERCADOPAGO_PUBLIC_KEY);

console.log(process.env.MERCADOPAGO_PUBLIC_KEY);

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
