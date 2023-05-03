import MainBtn from "@/components/UI/MainBtn";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import MpBtn from "@/components/checkout/MpBtb";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function CheckoutPage() {
  const [renderMP, setRenderMP] = useState(false);
  const [renderOnce, setRenderOnce] = useState(false);

  const router = useRouter();

  const navigateHandler = () => {
    router.back();
  };

  const onRenderMP = () => {
    setRenderMP(true);
  };

  let mpbtn = <div></div>;
  useEffect(() => {
    console.log("run effect");
    if (renderMP) {
      console.log("inside if");
      setRenderOnce(true);
    }
  }, [renderMP]);

  return (
    <>
      <Head>
        <title>MYW app</title>
        <meta name="description" content="MYW app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>Checkout Page</div>
      <CheckoutForm onRender={onRenderMP} />
      <MainBtn onClick={navigateHandler}>Back</MainBtn>
      {renderOnce && <MpBtn />}
    </>
  );
}

export default CheckoutPage;
