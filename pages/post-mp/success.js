import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";
import RegistrationCartContext from "@/store/registration-cart-context";
import { useContext, useEffect, useState } from "react";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";
import AuthContext from "@/store/auth-context";
import styles from "../../styles/PageContainer.module.scss";
import EventsContext from "@/store/events-context";

const SuccessPage = () => {
  const [eventPreMp, setEventPreMp] = useState({});
  const [submitingForm, setSubmitingForm] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const regisCtx = useContext(RegistrationCartContext);
  const authCtx = useContext(AuthContext);
  const eventsCtx = useContext(EventsContext);
  const router = useRouter();
  console.log(router);

  const registerToEvents = async (eventId, priceRegistration, mp_ref) => {
    try {
      const object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
        body: JSON.stringify({ eventId, priceRegistration, mp_ref }),
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
        console.log("registration successful");
        eventsCtx.fetchEventsFxn();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const eventPreMp = localStorage.getItem("event_pre_mp");
    if (eventPreMp) {
      const parsedEventPreMp = JSON.parse(eventPreMp);
      setEventPreMp(parsedEventPreMp);
    } else {
      console.log("Item not found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (eventPreMp && authCtx.authObject.token && router.query.payment_id) {
      registerToEvents(
        eventPreMp.eventId,
        eventPreMp.price,
        router.query.payment_id
      );
    }
  }, [eventPreMp, authCtx, router]);

  console.log("-----");
  console.log(eventPreMp);

  const navigateHandler = () => {
    router.push("/my-progress");
  };

  if (submitingForm) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage error={errorMessage} />;
  }

  return (
    <div className={styles.page_container_column}>
      <h1>¡Registro Exitoso!</h1>
      <p>
        Tu registro para el evento ha sido exitoso. Hemos recibido el pago con
        el número de identificación <span>{router.query.payment_id}</span>.
      </p>
      <p>¡Gracias por registrarte y esperamos que disfrutes del evento!</p>
      <MainBtn onClick={navigateHandler}>Revisa tus próximos evento</MainBtn>
    </div>
  );
};

export default SuccessPage;
