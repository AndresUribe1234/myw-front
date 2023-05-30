import { useRouter } from "next/router";
import styles from "../../../../styles/ManageEventIdPage.module.scss";
import { useState, useContext, useEffect } from "react";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";

const ManageEventIdPage = () => {
  const [statsVisible, setStatsVisible] = useState(true);
  const router = useRouter();
  const id = router.query.id;

  let contentComponent = <Spinner />;

  if (!statsVisible) contentComponent = <ErrorMessage />;

  return (
    <div>
      <div className={styles.navigation_container}>
        <div
          onClick={() => {
            setStatsVisible(false);
          }}
        >
          <p>Modificar evento</p>
        </div>
        <div
          onClick={() => {
            setStatsVisible(true);
          }}
        >
          <p>Estadisticas del evento</p>
        </div>
      </div>
      <div className={styles.content_container}>{contentComponent}</div>
    </div>
  );
};

export default ManageEventIdPage;
