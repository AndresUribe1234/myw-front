import MainBtn from "@/components/UI/MainBtn";
import MpBtn from "@/components/checkout/MpBtb";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const navigateHandler = () => {
    router.push("/checkout");
  };

  return (
    <>
      <Head>
        <title>MYW app</title>
        <meta name="description" content="MYW app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>Home page</div>
      <MainBtn onClick={navigateHandler}>Go to checkout</MainBtn>
    </>
  );
}
