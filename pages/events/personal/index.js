import CardNavigation from "@/components/UI/CardNavigation";
import styles from "../../../styles/PageContainer.module.scss";

const EventsPersonalPage = () => {
  return (
    <div className={styles.page_container}>
      <CardNavigation
        href={"/events/personal/manage"}
        title={"mis eventos"}
        description={
          "muestra todos los eventos que has creado y te permite acceder a información detallada sobre cada evento"
        }
      />
      <CardNavigation
        href={"/events/personal/create"}
        title={"crear evento"}
        description={
          "crea un nuevo evento y personaliza su información y detalles específicos"
        }
      />
    </div>
  );
};

export default EventsPersonalPage;
