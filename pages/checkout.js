import MainBtn from "@/components/UI/MainBtn";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import MpBtn from "@/components/checkout/MpBtb";
import styles from "../styles/PageContainer.module.scss";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NavigationLink from "@/components/UI/NavigationLink";

function CheckoutPage() {
  const [renderMP, setRenderMP] = useState(false);
  const [renderOnce, setRenderOnce] = useState(false);
  const [MPData, setMPData] = useState({});

  useEffect(() => {
    const script = document.getElementById("mp-script");
    script.setAttribute("status", "waiting");
  }, []);

  const router = useRouter();

  const navigateHandler = () => {
    router.back();
  };

  const onRenderMP = (formData) => {
    console.log("running this on checkoutpage!");
    setMPData({ ...formData });
    setRenderMP(true);
  };

  useEffect(() => {
    if (renderMP && !renderOnce) {
      setRenderOnce(true);
    }
  }, [renderMP, renderOnce]);

  return (
    <div className={styles.page_container_no_m}>
      <CheckoutForm onRender={onRenderMP} />
      {renderOnce && <MpBtn formData={MPData} />}
      <div className={styles.btn_container}>
        <button
          onClick={() => {
            router.back();
          }}
        >
          atras
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
