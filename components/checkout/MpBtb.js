import { useEffect, useContext } from "react";
import AuthContext from "@/store/auth-context";

function MpBtn({ formData }) {
  const authCtx = useContext(AuthContext);

  async function fetchCheckout() {
    const script = document.getElementById("mp-script");
    const status = script.getAttribute("status");
    if (status === "running") {
      return;
    }
    script.setAttribute("status", "running");

    const object = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authCtx.authObject.token,
      },
      body: JSON.stringify({
        ...formData,
      }),
    };

    console.log("inside mp component");
    console.log(formData);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODE_URL}/api/checkout/`,
      object
    );

    const data = await res.json();

    if (data.global) {
      script.setAttribute("data-preference-id", data.global);

      const mp = new window.MercadoPago(
        process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY,
        {
          locale: "es-CO",
        }
      );

      mp.checkout({
        preference: {
          id: data.global.id,
        },
        render: {
          container: ".mp-btn-container",
          label: "Pagar",
        },
      });
    }
  }

  useEffect(() => {
    if (document.querySelectorAll(".mp-btn-container button").length === 0) {
      (async function () {
        await fetchCheckout();
      })();
    }
  }, []);

  return <div className="mp-btn-container"></div>;
}

export default MpBtn;
