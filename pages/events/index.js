import ErrorMessage from "@/components/UI/ErrorMessage";
import EventsContext from "@/store/events-context";
import { useState, useEffect, useContext } from "react";
import Spinner from "@/components/UI/Spinner";
import styles from "../../styles/PageContainer.module.scss";
import CarouselEvent from "@/components/events/CarouselEvent";
import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";
import Calendar from "@/components/events/Calendar";
import LeyendEvents from "@/components/events/LeyendEvents";
import CalendarSection from "@/components/home/CalendarSection";

const EventsPage = () => {
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const eventsCtx = useContext(EventsContext);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!eventsCtx.fetchingData) {
      setFetchingData(false);
    }
  }, [eventsCtx.fetchingData]);

  const clickHandler = (route) => {
    router.push(route);
  };

  return (
    <div>
      {fetchingData && <Spinner />}
      {error && <ErrorMessage error={errorMessage} />}
      {!fetchingData && (
        <div className={styles.page_container_column}>
          <CarouselEvent
            items={eventsCtx.eventsObject.futureEvents}
            itemsPerPage={windowSize.width < 500 ? 2 : 4}
            title={"Próximos Eventos"}
          />
          <MainBtn
            onClick={clickHandler.bind(this, "/events/all?events=future")}
          >
            Mostrar todos los proximos eventos
          </MainBtn>
          <CarouselEvent
            items={eventsCtx.eventsObject.oldEvents}
            itemsPerPage={windowSize.width < 500 ? 2 : 4}
            title={"Eventos Anteriores"}
          />
          <MainBtn onClick={clickHandler.bind(this, "/events/all?events=old")}>
            Mostrar todos los eventos anteriores
          </MainBtn>
          <CalendarSection />
        </div>
      )}
    </div>
  );
};

export default EventsPage;
