import { createContext, useState, useEffect } from "react";

const EventsContext = createContext({
  eventsObject: {},
  futureEvents: "",
  oldEvents: "",
  allEvents: "",
  fetchingData: "",
  allEventsFnx: function () {},
  futureEventsFnx: function () {},
  oldEventsFxn: function () {},
});

export function EventContextProvider(props) {
  const [allEvents, setAllEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [oldEvents, setOldEvents] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);

  const fetchAllEvents = async function () {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/events/all`
      );

      const data = await response.json();

      if (response.status === 200) {
        setAllEvents(data.data.events);
        setFutureEvents(data.data.events);
        setOldEvents(data.data.events);
        setFetchingData(false);
      }

      if (response.status !== 200) {
        setFetchingData(false);
        console.log("Error in events context fetch");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  function allEventsHandler(events) {
    setAllEvents([...events]);
  }
  function futureEventsHandler(events) {
    setFutureEvents([...events]);
  }
  function oldEventsHandler(events) {
    setOldEvents([...events]);
  }

  const context = {
    eventsObject: { allEvents, futureEvents, oldEvents, fetchingData },
    allEventsFnx: allEventsHandler,
    futureEventsFnx: futureEventsHandler,
    oldEventsFxn: oldEventsHandler,
  };

  return (
    <EventsContext.Provider value={context}>
      {props.children}
    </EventsContext.Provider>
  );
}

export default EventsContext;
