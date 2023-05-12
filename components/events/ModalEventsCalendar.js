import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import styles from "../../styles/ModalEventsCalendar.module.scss";
import MainBtn from "../UI/MainBtn";
import moment from "moment";
import tz from "moment-timezone";
require("moment/locale/es");
import { useRouter } from "next/router";

function ModalEventsCalendar(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.onViewModal();
  };
  const router = useRouter();

  useEffect(() => {
    if (props.view === true) {
      handleOpen();
    }
  }, [props.view]);

  const data = props.data[0];

  const title = moment.utc(data?._id).local("es").format("MMMM DD, yyyy");
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal_content_container}>
          <h1>{title}</h1>
          <div className={styles.all_events_container}>
            <div className={styles.event_container}>
              <div className={styles.title_lable}>evento</div>
              <div className={styles.type_lable}>tipo</div>
              <div className={styles.time_lable}>hora</div>
            </div>
            {data?.events.map((event, index) => (
              <div
                className={styles.event_container}
                onClick={() => {
                  router.push(`/events/${event.eventTitle}?id=${event._id}`);
                }}
                key={index}
              >
                <div className={styles.title_lable}>{event.eventTitle}</div>
                <div className={styles.type_lable}>{event.eventType}</div>

                <div className={styles.time_lable}>
                  {moment
                    .utc(event.eventDate)
                    .tz("America/Bogota")
                    .local("es")
                    .format("h:mm a")}
                </div>
              </div>
            ))}
          </div>
          <MainBtn onClick={handleClose}>cerrar</MainBtn>
        </div>
      </Modal>
    </div>
  );
}

export default ModalEventsCalendar;
