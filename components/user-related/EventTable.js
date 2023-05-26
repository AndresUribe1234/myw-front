import styles from "../../styles/EventTable.module.scss";
import moment from "moment/moment";
require("moment/locale/es");
import tz from "moment-timezone";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EventTable = ({ data }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const router = useRouter();

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (windowSize.width < 500) {
    return (
      <div className={styles.component_container}>
        <div className={styles.row_table}>
          <p>evento</p>
          <p>fecha</p>
        </div>
        {data.map((event, index) => (
          <div
            className={[styles.row_table, styles.row_body].join(" ")}
            key={index}
            onClick={() => {
              router.push(
                `/events/${event.eventId.title}?id=${event.eventId._id}`
              );
            }}
          >
            <p>{event.eventId.title}</p>

            <p>
              {moment
                .utc(event.eventId.eventDate)
                .tz("America/Bogota")
                .local("es")
                .format("MMM DD yyyy")}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.component_container}>
      <div className={styles.row_table}>
        <p>evento</p>
        <p>tipo</p>
        <p>modalidad</p>
        <p>fecha</p>
        <p>hora</p>
        <p>valor</p>
        <p>referencia pago</p>
      </div>

      {data.map((event, index) => (
        <div
          className={[styles.row_table, styles.row_body].join(" ")}
          key={index}
          onClick={() => {
            router.push(
              `/events/${event.eventId.title}?id=${event.eventId._id}`
            );
          }}
        >
          <p>{event.eventId.title}</p>
          <p>{event.eventId.eventType}</p>
          <p>{event.eventId.modalityType}</p>
          <p>
            {moment
              .utc(event.eventId.eventDate)
              .tz("America/Bogota")
              .local("es")
              .format("MMM DD yyyy")}
          </p>
          <p>
            {moment
              .utc(event.eventId.eventDate)
              .tz("America/Bogota")
              .local("es")
              .format("h:mm a")}
          </p>
          <p>
            {event.priceRegistration === 0
              ? "Gratuito"
              : event.priceRegistration.toLocaleString("es-ES")}
          </p>
          <p>{!event.mp_ref ? "NA" : event.mp_ref}</p>
        </div>
      ))}
    </div>
  );
};

export default EventTable;
