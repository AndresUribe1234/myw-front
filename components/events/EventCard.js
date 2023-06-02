import React from "react";
import Link from "next/link";
import styles from "../../styles/EventCard.module.scss";
import moment from "moment/moment";
require("moment/locale/es");
import tz from "moment-timezone";

const EventCard = ({ event, goTo }) => {
  return (
    <Link
      href={!goTo ? `/events/${event.title}?id=${event._id}` : goTo}
      className={styles.card}
    >
      <div>
        <h2 className={styles.title}>{event.title}</h2>
        <p className={styles.description}>{event.description}</p>
        <p
          className={styles.type}
        >{`${event.eventType} - ${event.modalityType}`}</p>
        <p className={styles.date}>
          {moment
            .utc(event.eventDate)
            .tz("America/Bogota")
            .local("es")
            .format("yyyy-MMM-DD")}
        </p>
        <p className={styles.date}>
          {moment
            .utc(event.eventDate)
            .tz("America/Bogota")
            .local("es")
            .format("h:mm a")}
        </p>

        <p className={styles.participants}>
          {event.registeredParticipants.length}/{event.maxParticipants}{" "}
          participantes
        </p>
        <p className={styles.fee}>{event.suscriptionType}</p>
        {event.suscriptionType === "Pagada" && (
          <p className={styles.fee}>{`${event.registrationFee?.toLocaleString(
            "es-ES"
          )} ${event.currency}`}</p>
        )}
        {event.address && (
          <p className={styles.location}>{event.address.city}</p>
        )}
      </div>
    </Link>
  );
};

export default EventCard;
