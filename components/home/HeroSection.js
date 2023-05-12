// components/HeroSection.js
import React from "react";
import styles from "../../styles/HeroSection.module.scss";
import SearchComponent from "../functionality/SearchComponent";
import MainBtn from "../UI/MainBtn";
import { useEffect, useContext, useState } from "react";
import EventsContext from "@/store/events-context";

const HeroSection = () => {
  const eventsCtx = useContext(EventsContext);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!eventsCtx.fetchingData) {
      const eventsName = eventsCtx.eventsObject.allEvents.map((ele) => {
        return { title: ele.title, id: ele._id };
      });

      setEvents(eventsName);
    }
  }, [eventsCtx.eventsObject.allEvents]);

  return (
    <section className={styles.hero}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          Los momentos <span>nos definen</span>
        </h1>
        <p className={styles.subtext}>
          Sabemos que cada momento cuenta y queremos ayudarte a aprovechar al
          máximo cada experiencia. Únete a nuestra comunidad, descubre eventos
          emocionantes y crea recuerdos que te definirán. ¡Es hora de vivir cada
          instante al máximo!
        </p>
      </div>
      <div className={styles.searchContainer}>
        <h3 className={styles.searchTitle}>Encuentra tu proximo momento</h3>
        <SearchComponent
          data={events}
          placeholder={"busca tu próximo momento..."}
          color={"black"}
        />
      </div>
    </section>
  );
};

export default HeroSection;
