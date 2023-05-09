import React from "react";
import Link from "next/link";
import styles from "../../styles/EventCard.module.scss";
import moment from "moment/moment";

const EventCard = ({ event }) => {
  return (
    <Link href={`/events/${event._id}`} className={styles.card}>
      <div>
        <h2 className={styles.title}>{event.title}</h2>
        <p className={styles.description}>{event.description}</p>
        <p className={styles.type}>{event.eventType}</p>
        <p className={styles.date}>
          {moment(event.eventDate).local("es").format("yyyy-MMM-DD")}
        </p>
        {event.location && (
          <p className={styles.location}>
            {event.location.coordinates.join(", ")}
          </p>
        )}
        {event.registrationFee && (
          <p className={styles.fee}>
            {event.registrationFee} {event.currency}
          </p>
        )}
        <p className={styles.participants}>
          {event.registeredParticipants.length}/{event.maxParticipants}{" "}
          participantes
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
