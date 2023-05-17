import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";
import styles from "../../styles/EventDetail.module.scss";
import { useState, useEffect } from "react";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";
import EventDisplay from "@/components/events/EventDisplay";

const EventDetail = () => {
  const router = useRouter();
  const event = router.query.event;
  const id = router.query.id;

  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setError(false);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NODE_URL}/api/events/detail/${id}`
        );

        const data = await res.json();

        console.log(data);
        if (res.status === 200) {
          setEventData(data.data.eventDetails);
        }

        if (res.status !== 200) {
          console.log("Error");
          setErrorMsg(data.err);
          setError(true);
          setEventData([]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (router.query.id) {
      fetchEvent();
    }
  }, [router.query]);

  if (!eventData) return <Spinner />;
  if (error) return <ErrorMessage error={errorMsg} />;

  const clickHandler = () => {
    router.push(
      `/checkout?event=${event}&title=${eventData.title}&price=${eventData.registrationFee}`
    );
  };

  return (
    <div className={styles.detail_container}>
      <h1>
        Evento <span>{event}</span>
      </h1>
      <EventDisplay data={eventData} />
      <p>boton para el flujo de registro</p>
      <MainBtn onClick={clickHandler}>Registrarme</MainBtn>
      <p>ubicacion viene aqui</p>
    </div>
  );
};

export default EventDetail;
