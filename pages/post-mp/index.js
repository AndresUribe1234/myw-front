import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";
import styles from "../../styles/PageContainer.module.scss";

const NotCompletePage = () => {
  const router = useRouter();
  console.log(router);

  const navigateHandler = () => {
    router.push("/events");
  };

  return (
    <div className={styles.page_container_column}>
      <h1>¡Registro No Exitoso!</h1>
      <p>
        Lamentamos informarte que tu registro para el evento no fue exitoso y el
        pago no ha sido recibido. Parece que la operación fue cancelada o ha
        ocurrido un error.
      </p>
      <p>
        Por favor, verifica nuevamente nuestros eventos y vuelve a registrarte
        para asegurarte de asegurar tu lugar.
      </p>
      <p>
        Agradecemos tu comprensión y te pedimos disculpas por cualquier
        inconveniente que esto haya causado.
      </p>
      <MainBtn onClick={navigateHandler}>Descubre nuestros eventos</MainBtn>
    </div>
  );
};

export default NotCompletePage;
