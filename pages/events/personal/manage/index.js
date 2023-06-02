import EventCard from "@/components/events/EventCard";
import styles from "../../../../styles/PageContainer.module.scss";
import { useEffect, useState, useContext } from "react";
import AuthContext from "@/store/auth-context";
import Spinner from "@/components/UI/Spinner";
import ErrorMessage from "@/components/UI/ErrorMessage";
import MainBtn from "@/components/UI/MainBtn";
import { useRouter } from "next/router";

const EventsPersonalManagePage = () => {
  const authCtx = useContext(AuthContext);
  const [eventsArray, setEventsArray] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const fetchAllCreatedEvents = async function () {
    try {
      if (!authCtx.authObject.token) {
        return;
      }

      const objectOptions = {
        headers: {
          Authorization: "Bearer " + authCtx.authObject.token,
        },
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/events/`,
        objectOptions
      );

      const data = await response.json();

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
    fetchAllCreatedEvents();
  }, [authCtx.authObject.token]);

  if (fetchingData) {
    return <Spinner />;
  }

  return (
    <div className={styles.page_event_container}>
      {!fetchingData &&
        !error &&
        eventsArray &&
        eventsArray.map((ele, index) => (
          <EventCard
            event={ele}
            key={index}
            goTo={`/events/personal/manage/${ele._id}`}
          />
        ))}

      {error && <ErrorMessage error={errorMessage} />}
      {eventsArray.length < 1 && (
        <div className={styles.column_container}>
          <p>No has creado ningún evento hasta el momento.</p>
          <p>
            ¡Anímate a crear tu propio evento y comparte experiencias únicas con
            los demás!
          </p>
          <MainBtn
            onClick={() => {
              router.push("/events/personal/create");
            }}
          >
            Crea tu evento
          </MainBtn>
        </div>
      )}
    </div>
  );
};

export default EventsPersonalManagePage;
