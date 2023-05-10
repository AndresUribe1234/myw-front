import ErrorMessage from "@/components/UI/ErrorMessage";
import EventsContext from "@/store/events-context";
import { useState, useEffect, useContext } from "react";
import Spinner from "@/components/UI/Spinner";
import styles from "../../styles/PageContainer.module.scss";
import CarouselEvent from "@/components/events/CarouselEvent";
import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";
import Calendar from "@/components/events/Calendar";

const EventsPage = () => {
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const eventsCtx = useContext(EventsContext);

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
            items={eventsCtx.eventsObject.allEvents}
            itemsPerPage={4}
            title={"Próximos Eventos"}
          />
          <MainBtn
            onClick={clickHandler.bind(this, "/events/all?events=future")}
          >
            Mostrar todos los proximos eventos
          </MainBtn>
          <CarouselEvent
            items={eventsCtx.eventsObject.allEvents}
            itemsPerPage={4}
            title={"Eventos Anteriores"}
          />
          <MainBtn onClick={clickHandler.bind(this, "/events/all?events=old")}>
            Mostrar todos los eventos anteriores
          </MainBtn>
          <h1>Calendario de Eventos</h1>
          <Calendar />
        </div>
      )}
    </div>
  );
};

export default EventsPage;
