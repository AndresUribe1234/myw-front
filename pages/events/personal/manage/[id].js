import { useRouter } from "next/router";
import styles from "../../../../styles/ManageEventIdPage.module.scss";
import { useState, useContext, useEffect } from "react";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";
import EditEventForm from "@/components/events/backoffice/EditEventForm";
import EventsStats from "@/components/events/backoffice/EventsStats";
import AuthContext from "@/store/auth-context";

const ManageEventIdPage = () => {
  const [statsVisible, setStatsVisible] = useState(true);
  const router = useRouter();
  const id = router.query.id;
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchingData, setFetchingData] = useState(true);
  const [eventData, setEventData] = useState({});

  const fetchEvent = async function (id) {
    try {
      const object = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };

      setFetchingData(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/events/user?id=${id}`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        setFetchingData(false);
        setErrorMessage(data.err);
        setError(true);
      }

      if (response.status === 200) {
        setFetchingData(false);
        setError(false);
        setEventData(data.event);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvent(id);
  }, []);

  let contentComponent = <EventsStats />;

  if (!statsVisible) contentComponent = <EditEventForm data={eventData} />;

  if (fetchingData) return <Spinner />;

  return (
    <div>
      <div className={styles.navigation_container}>
        <div
          className={[!statsVisible ? styles.activeColor : ""].join("")}
          onClick={() => {
            setStatsVisible(false);
          }}
        >
          <p>Modificar evento</p>
        </div>
        <div
          className={[statsVisible ? styles.activeColor : ""].join("")}
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
