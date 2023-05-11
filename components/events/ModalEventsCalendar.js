import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styles from "../../styles/ModalEventsCalendar.module.scss";
import MainBtn from "../UI/MainBtn";

function ModalEventsCalendar(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.onViewModal();
  };

  useEffect(() => {
    if (props.view === true) {
      handleOpen();
    }
  }, [props.view]);

  console.log(props);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal_content_container}>
          <h1>{props.title}</h1>
          Hello theres an events here!
          <MainBtn onClick={handleClose}>cerrar</MainBtn>
        </div>
      </Modal>
    </div>
  );
}

export default ModalEventsCalendar;
