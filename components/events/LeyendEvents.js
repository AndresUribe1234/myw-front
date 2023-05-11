import styles from "../../styles/LeyendEvents.module.scss";

const LeyendEvents = () => {
  const eventsArray = {
    Carrera: "#136f63ff",
    Senderismo: "#e0ca3cff",
    Ciclismo: "#f34213ff",
    Natación: "#3e2f5bff",
    Otro: "#b8a276ff",
  };

  return (
    <div className={styles.leyend_container}>
      {Object.keys(eventsArray).map((ele, index) => (
        <div className={styles.label_container} key={index}>
          <div
            className={styles.dot_container}
            style={{ backgroundColor: eventsArray[ele] }}
          />
          <p>{ele}</p>
        </div>
      ))}
    </div>
  );
};

export default LeyendEvents;
