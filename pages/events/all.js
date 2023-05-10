import React, { useContext } from "react";
import styles from "../../styles/PageContainer.module.scss";
import { useRouter } from "next/router";
import EventsContext from "@/store/events-context";
import EventCard from "@/components/events/EventCard";

const AllEventsPage = () => {
  const router = useRouter();
  const eventsCtx = useContext(EventsContext);
  let title;

  if (router.query.events === "future") {
    title = "Proximos Eventos";
  }
  if (router.query.events === "old") {
    title = "Eventos Anteriores";
  }
  return (
    <div className={styles.page_container_column}>
      <h1>{title}</h1>
      {eventsCtx.eventsObject.allEvents && (
        <div className={styles.event_container}>
          {eventsCtx.eventsObject.allEvents.map((ele, index) => (
            <EventCard event={ele} key={index} />
          ))}
        </div>
      )}
      <div className={styles.event_container}>{/* Your content here */}</div>
    </div>
  );
};

export default AllEventsPage;
