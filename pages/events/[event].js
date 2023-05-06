import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";
import styles from "../../styles/EventDetail.module.scss";

const EventDetail = () => {
  const router = useRouter();
  const event = router.query.event;

  const clickHandler = () => {
    router.push(`/checkout?event=${event}`);
  };
  return (
    <div className={styles.detail_container}>
      <h1>
        Evento <span>{event}</span>
      </h1>
      <p>Detalles</p>
      <MainBtn onClick={clickHandler}>Registrarme</MainBtn>
    </div>
  );
};

export default EventDetail;
