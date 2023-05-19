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
      <p>Descripcón</p>
      <p className={styles.data_field}>{eventData.description}</p>
      <div className={styles.details}>
        <div>
          <p>Organizador</p>
          <p className={styles.data_field}> {eventData.nameOrganizer}</p>
        </div>
        <div>
          <p>Modalidad</p>
          <p className={styles.data_field}> {eventData.modalityType}</p>
        </div>
        <div>
          <p>Tipo</p>
          <p className={styles.data_field}> {eventData.eventType}</p>
        </div>
      </div>
      <p>Fecha y hora</p>
      <p className={styles.data_field}>
        {moment
          .utc(eventData.eventDate)
          .tz("America/Bogota")
          .local("es")
          .format("MMMM DD, yyyy h:mm a")}
      </p>
      <div className={styles.details}>
        <div>
          <p>Inscripción</p>
          <p className={styles.data_field}> {eventData.suscriptionType}</p>
        </div>
        <div>
          <p>Valor</p>
          <p
            className={styles.data_field}
          >{`${eventData.registrationFee?.toLocaleString("es-ES")} ${
            eventData.currency
          } `}</p>
        </div>
      </div>
      <p>Participantes</p>
      <p className={styles.data_field}>
        {eventData.registeredParticipants
          ? eventData.registeredParticipants.length
          : 0}
        /{eventData.maxParticipants}
      </p>
      <p>Cupos restantes</p>
      <p className={styles.data_field}>#</p>
    </div>
  );
};

export default EventDisplay;
