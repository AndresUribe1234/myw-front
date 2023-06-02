import Spinner from "@/components/UI/Spinner";
import styles from "../../styles/PageContainer.module.scss";
import { useEffect, useState, useContext } from "react";
import ErrorMessage from "@/components/UI/ErrorMessage";
import AuthContext from "@/store/auth-context";
import EventTable from "@/components/user-related/EventTable";

const MyProgress = () => {
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const authCtx = useContext(AuthContext);
  const [futureEvents, setFutureEvents] = useState([]);
  const [oldEvents, setOldEvents] = useState([]);
  const [results, setResults] = useState(false);

  async function getUserEvents() {
    try {
      const object = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };
      setFetchingData(true);
      setError(false);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/events/registration`,
        object
      );

      const data = await response.json();

      if (response.status === 200) {
        setFetchingData(false);
        setFutureEvents(data.data.futureEvents);
        setOldEvents(data.data.oldEvents);
      }

      if (response.status !== 200) {
        setFetchingData(false);
        setError(true);
        setErrorMessage(data.err);
        console.log("Error in events context fetch");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserEvents();
  }, []);

  let resultContent = (
    <p>
      No has subido tus resultado para algun evento. ¡Anímate a participar y a
      darle seguimiento a tus logros!
    </p>
  );

  let futureContent = (
    <p>
      No participarás en un evento próximamente. ¡Anímate a registrarte en tu
      próximo evento!
    </p>
  );

  if (futureEvents.length > 0) {
    futureContent = <EventTable data={futureEvents} />;
  }

  if (fetchingData) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage err={errorMessage} />;
  }

  return (
    <div className={styles.page_container_column}>
      {!results && futureEvents.length < 1 && oldEvents.length < 1 && (
        <p className={styles.warning_message}>
          No has participado en ningún evento hasta el momento. Por lo tanto, no
          tienes eventos futuros, eventos pasados ni resultados de eventos
          registrados.
        </p>
      )}
      {futureEvents.length > 0 && (
        <>
          <h1>Tus próximos Eventos</h1>
          <EventTable data={futureEvents} />
        </>
      )}
      {oldEvents.length > 0 && (
        <>
          <h1>Tus eventos Pasados</h1>
          <EventTable data={oldEvents} />
        </>
      )}
      {results && (
        <>
          <h1>Tus resultados</h1>
        </>
      )}
    </div>
  );
};

export default MyProgress;
