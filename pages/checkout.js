import MainBtn from "@/components/UI/MainBtn";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import MpBtn from "@/components/checkout/MpBtb";
import styles from "../styles/PageContainer.module.scss";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import RegistrationCartContext from "@/store/registration-cart-context";
import AuthContext from "@/store/auth-context";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";
import EventsContext from "@/store/events-context";

function CheckoutPage() {
  const [renderMP, setRenderMP] = useState(false);
  const [renderOnce, setRenderOnce] = useState(false);
  const [MPData, setMPData] = useState({});
  const regisCtx = useContext(RegistrationCartContext);
  const authCtx = useContext(AuthContext);
  const eventsCtx = useContext(EventsContext);
  const [submitingForm, setSubmitingForm] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const script = document.getElementById("mp-script");
    script.setAttribute("status", "waiting");
  }, []);

  const router = useRouter();

  const registerToEvents = async (eventId, priceRegistration) => {
    try {
      const object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
        body: JSON.stringify({ eventId, priceRegistration }),
      };
      setSubmitingForm(true);
      setError(false);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/events/registration`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        setSubmitingForm(false);
        setError(true);
        setErrorMessage(data.err);
      }

      if (response.status === 200) {
        setSubmitingForm(false);
        setError(false);
        router.push("/my-progress");
        eventsCtx.fetchEventsFxn();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onRenderMP = async (formData, suscription) => {
    if (suscription === "Pagada") {
      localStorage.setItem(
        "event_pre_mp",
        JSON.stringify({
          eventId: regisCtx.eventInformation._id,
          price: regisCtx.eventInformation.registrationFee,
        })
      );
      setMPData({ ...formData });
      setRenderMP(true);
    }

    if (suscription === "Gratuita") {
      await registerToEvents(
        regisCtx.eventInformation._id,
        regisCtx.eventInformation.registrationFee
      );
    }
  };

  useEffect(() => {
    if (renderMP && !renderOnce) {
      setRenderOnce(true);
    }
  }, [renderMP, renderOnce]);

  if (submitingForm) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage error={errorMessage} />;
  }

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
