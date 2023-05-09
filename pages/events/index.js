import ErrorMessage from "@/components/UI/ErrorMessage";
import EventCard from "@/components/events/EventCard";
import { useState, useEffect } from "react";
import Spinner from "@/components/UI/Spinner";
import styles from "../../styles/PageContainer.module.scss";

const EventsPage = () => {
  const [eventsArray, setEventsArray] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAllEvents = async function () {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/events/all`
      );

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        setFetchingData(false);
        setEventsArray(data.data.events);
      }

      if (response.status !== 200) {
        setErrorMessage(data.err);
        setError(true);
        setFetchingData(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div>
      {!fetchingData && !error && eventsArray && (
        <div className={styles.page_container_column}>
          <p>up coming events ...</p>
          <div className={styles.event_container}>
            {eventsArray.map((ele, index) => (
              <EventCard event={ele} />
            ))}
          </div>
          <p>old events ...</p>
          <div className={styles.event_container}>
            {eventsArray.map((ele, index) => (
              <EventCard event={ele} />
            ))}
          </div>
          <p>events calendar ...</p>
        </div>
      )}
      {fetchingData && <Spinner />}
      {error && <ErrorMessage error={errorMessage} />}
    </div>
  );
};

export default EventsPage;
