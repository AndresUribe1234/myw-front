import React, { useState, useContext } from "react";
import MainInput from "../UI/MainInput";
import MainBtn from "../UI/MainBtn";
import styles from "../../styles/CreateEventForm.module.scss";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/router";
import NavigationLink from "../UI/NavigationLink";
import EventsContext from "@/store/events-context";
import dynamic from "next/dynamic";

// Import the dynamic map component
const MapWithNoSSR = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

const CreateEventForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nameOrganizer, setNameOrganizer] = useState("");
  const [modalityType, setModalityType] = useState("Virtual");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [suscriptionType, setSuscriptionType] = useState("Gratuita");
  const [registrationFee, setRegistrationFee] = useState("");
  const [eventType, setEventType] = useState("Carrera");
  const [eventDate, setEventDate] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [addressMongo, setAddressMongo] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);
  const authCtx = useContext(AuthContext);
  const eventsCtx = useContext(EventsContext);

  const createEventAPICall = async function (eventInformation, email) {
    try {
      const object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
        body: JSON.stringify({
          ...eventInformation,
          email: email,
        }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/events/user`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        setSubmitingForm(false);
        setErrorMessage(data.err);
        setError(true);
      }

      if (response.status === 200) {
        router.push("/events/personal/manage");
        setSubmitingForm(false);
        setError(false);
        eventsCtx.fetchEventsFxn();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      description,
      nameOrganizer,
      suscriptionType,
      modalityType,
      eventType,
      eventDate,
      location: {
        type: "Point",
        coordinates: [parseFloat(latitude), parseFloat(longitude)],
      },
      registrationFee: parseFloat(registrationFee) || 0,
      maxParticipants: parseInt(maxParticipants),
      addressMongo,
    };

    await createEventAPICall(newEvent, authCtx.authObject.email);
  };

  const addressHandler = (dataObject) => {
    setAddress(dataObject.address);
    setLongitude(dataObject.lng);
    setLatitude(dataObject.lat);
    setAddressMongo(dataObject);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.event_form}>
      <h1>crea tu evento</h1>
      <label htmlFor="title">Título</label>
      <MainInput
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        minLength="3"
        maxLength="100"
      />
      <label htmlFor="description">Descripción</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        minLength="10"
        maxLength="1000"
        className={styles.beautiful_textarea}
      />
      <label htmlFor="title">Nombre del organizador</label>
      <MainInput
        type="text"
        value={nameOrganizer}
        onChange={(e) => setNameOrganizer(e.target.value)}
        required
        minLength="3"
        maxLength="30"
      />
      <label htmlFor="eventType">Tipo de modalidad del evento</label>
      <select
        value={modalityType}
        onChange={(e) => setModalityType(e.target.value)}
        required
        className={styles.custom_selector}
      >
        <option value="Presencial">Presencial</option>
        <option value="Virtual">Virtual</option>
      </select>
      {modalityType === "Presencial" && (
        <div className={styles.address_container}>
          <p>
            Por favor, haz clic en el mapa para seleccionar la ubicación de tu
            evento
          </p>
          <MapWithNoSSR onGetAddress={addressHandler} />
          <label htmlFor="address">Ubicación del evento</label>
          <p>
            {address.length < 1
              ? "No se ha seleccionado ninguna ubicación"
              : address}
          </p>
        </div>
      )}

      <label>Tipo de suscripción</label>
      <select
        value={suscriptionType}
        onChange={(e) => setSuscriptionType(e.target.value)}
        required
        className={styles.custom_selector}
      >
        <option value="Gratuita">Gratuita</option>
        <option value="Pagada">Pagada</option>
      </select>
      {suscriptionType === "Pagada" && (
        <>
          <label htmlFor="registrationFee">Tarifa de inscripción</label>
          <MainInput
            type="number"
            id="registrationFee"
            value={registrationFee}
            onChange={(e) => setRegistrationFee(e.target.value)}
            min="0"
          />
        </>
      )}
      <label htmlFor="eventType">Tipo de evento</label>
      <select
        id="eventType"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        required
        className={styles.custom_selector}
      >
        <option value="Carrera">Carrera</option>
        <option value="Senderismo">Senderismo</option>
        <option value="Ciclismo">Ciclismo</option>
        <option value="Natación">Natación</option>
        <option value="Otro">Otro</option>
      </select>

      <label htmlFor="eventDate">Fecha del evento</label>
      <MainInput
        type="datetime-local"
        id="eventDate"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        required
      />

      <label htmlFor="maxParticipants">Número máximo de participantes</label>
      <MainInput
        type="number"
        id="maxParticipants"
        value={maxParticipants}
        onChange={(e) => setMaxParticipants(e.target.value)}
        required
        min="1"
      />

      <MainBtn type="submit">crear evento</MainBtn>
      <NavigationLink href="/events/personal" className={styles.nav_link}>
        atras
      </NavigationLink>
      {submitingForm && <p className={styles.loggingIn}>creando evento...</p>}
      {!submitingForm && error && (
        <p className={styles["err-message"]}>{`Error: ${errorMessage}`}</p>
      )}
    </form>
  );
};

export default CreateEventForm;
