import React, { useContext, useState } from "react";
import styles from "../../styles/PageContainer.module.scss";
import { useRouter } from "next/router";
import EventsContext from "@/store/events-context";
import EventCard from "@/components/events/EventCard";

const AllEventsPage = () => {
  const [renderEvents, setRenderEvents] = useState(false);
  const router = useRouter();
  const eventsCtx = useContext(EventsContext);
  let title;
  let eventsToShow;

  if (router.query.events === "future") {
    title = "Proximos Eventos";
    eventsToShow = "futureEvents";
    console.log(title, eventsToShow);
  }
  if (router.query.events === "old") {
    title = "Eventos Anteriores";
    eventsToShow = "oldEvents";
    console.log(title, eventsToShow);
  }
  return (
    <div className={styles.page_container_column}>
      <h1>{title}</h1>
      {eventsCtx.eventsObject && (
        <div className={styles.event_container}>
          {eventsCtx.eventsObject[`${eventsToShow}`].map((ele, index) => (
            <EventCard event={ele} key={index} />
          ))}
        </div>
      )}
      <div className={styles.event_container}>{/* Your content here */}</div>
    </div>
  );
};

export default AllEventsPage;
