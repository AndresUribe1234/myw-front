import React, { useState, useEffect } from "react";
import moment from "moment";
import tz from "moment-timezone";
require("moment/locale/es");
import styles from "../../styles/EventDisplay.module.scss";

const EventDisplay = (props) => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    setEventData(props.data);
  }, [props.data]);

  return (
    <div className={styles.eventDisplay}>
      <p>descripcón</p>
      <p className={styles.data_field}>{eventData.description}</p>
      <div className={styles.details}>
        <div>
          <p>Organizador</p>
          <p className={styles.data_field}> {eventData.organizer}</p>
        </div>
        <div>
          <p>Tipo</p>
          <p className={styles.data_field}> {eventData.eventType}</p>
        </div>
      </div>
      <p>fecha y hora</p>

      <p className={styles.data_field}>
        {moment
          .utc(eventData.eventDate)
          .tz("America/Bogota")
          .local("es")
          .format("MMMM DD, yyyy h:mm a")}
      </p>
      <p>inscripción</p>
      <p className={styles.data_field}>
        {eventData.registrationFee
          ? `${eventData.registrationFee.toLocaleString("es-ES")} ${
              eventData.currency
            }`
          : "gratuita"}
      </p>
      <p>participantes</p>
      <p className={styles.data_field}>
        {eventData.registeredParticipants
          ? eventData.registeredParticipants.length
          : 0}
        /{eventData.maxParticipants}
      </p>
      <p>cupos restantes</p>
      <p className={styles.data_field}>#</p>
    </div>
  );
};

export default EventDisplay;
