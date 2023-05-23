import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";
import RegistrationCartContext from "@/store/registration-cart-context";
import { useContext, useEffect, useState } from "react";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";
import AuthContext from "@/store/auth-context";

const SuccessPage = () => {
  const [eventPreMp, setEventPreMp] = useState({});
  const [submitingForm, setSubmitingForm] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const regisCtx = useContext(RegistrationCartContext);
  const authCtx = useContext(AuthContext);
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
        console.log("registration successful");
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
    if (eventPreMp && authCtx.authObject.token) {
      registerToEvents(eventPreMp.eventId, eventPreMp.price);
    }
  }, [eventPreMp, authCtx]);

  console.log("-----");
  console.log(eventPreMp);

  const navigateHandler = () => {
    router.push("/");
  };

  if (submitingForm) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage error={errorMessage} />;
  }

  return (
    <div>
      Success page
      <MainBtn onClick={navigateHandler}>Back</MainBtn>
    </div>
  );
};

export default SuccessPage;
