import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import styles from "../../../styles/ModalEventsCalendar.module.scss";
import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";

function ModalAuth(props) {
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

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal_content_container}>
          <p>Por favor, inicia sesión para poder registrarte en este evento</p>
          <MainBtn
            onClick={() => {
              handleClose();
              router.push("/authentication");
            }}
          >
            Iniciar sesión
          </MainBtn>
        </div>
      </Modal>
    </div>
  );
}

export default ModalAuth;
