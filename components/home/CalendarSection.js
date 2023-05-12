import { useRouter } from "next/router";
import Calendar from "@/components/events/Calendar";
import LeyendEvents from "@/components/events/LeyendEvents";
import { useContext } from "react";
import EventsContext from "@/store/events-context";
import styles from "../../styles/CalendarSection.module.scss";

function CalendarSection(props) {
  const router = useRouter();
  const eventsCtx = useContext(EventsContext);
  return (
    <div
      className={styles.calendar_section_container}
      style={{ backgroundColor: props.color ? props.color : "" }}
    >
      <h1>Calendario de Eventos</h1>
      <Calendar
        data={eventsCtx.eventsObject.allEvents}
        groupedData={eventsCtx.eventsObject.groupedEvents}
      />
      <LeyendEvents />
    </div>
  );
}

export default CalendarSection;
