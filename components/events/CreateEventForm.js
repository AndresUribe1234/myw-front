import React, { useRef, useState, useContext } from "react";
import MainInput from "../UI/MainInput";
import MainBtn from "../UI/MainBtn";
import styles from "../../styles/CreateEventForm.module.scss";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/router";
import NavigationLink from "../UI/NavigationLink";

const CreateEventForm = () => {
  const router = useRouter();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const eventTypeRef = useRef();
  const eventDateRef = useRef();
  const addressRef = useRef();
  const latitudeRef = useRef();
  const longitudeRef = useRef();
  const registrationFeeRef = useRef();
  const maxParticipantsRef = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);
  const authCtx = useContext(AuthContext);

  const createEventAPICall = async function (eventInformation, email) {
    try {
      const object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
        body: JSON.stringify({
          title: eventInformation.title,
          description: eventInformation.description,
          email: email,
          eventType: eventInformation.eventType,
          eventDate: eventInformation.eventDate,
          registrationFee: eventInformation.registrationFee || undefined,
          maxParticipants: eventInformation.maxParticipants,
        }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/events/`,
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      eventType: eventTypeRef.current.value,
      eventDate: eventDateRef.current.value,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(latitudeRef.current.value),
          parseFloat(longitudeRef.current.value),
        ],
      },
      registrationFee: parseFloat(registrationFeeRef.current.value) || 0,
      maxParticipants: parseInt(maxParticipantsRef.current.value),
    };

    // Submit the new event data to your API

    console.log(newEvent);
    await createEventAPICall(newEvent, authCtx.authObject.email);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.event_form}>
      <h1>crea tu evento</h1>
      <label htmlFor="title">título</label>
      <MainInput
        type="text"
        id="title"
        ref={titleRef}
        required
        minLength="3"
        maxLength="100"
      />

      <label htmlFor="description">descripción</label>
      <textarea
        id="description"
        ref={descriptionRef}
        required
        minLength="10"
        maxLength="1000"
        className={styles.beautiful_textarea}
      />

      <label htmlFor="eventType">tipo de evento</label>
      <select
        id="eventType"
        ref={eventTypeRef}
        required
        className={styles.custom_selector}
      >
        <option value="Running">Carrera</option>
        <option value="Hiking">Senderismo</option>
        <option value="Cycling">Ciclismo</option>
        <option value="Swimming">Natación</option>
        <option value="Other">Otro</option>
      </select>

      <label htmlFor="eventDate">fecha del evento</label>
      <MainInput
        type="datetime-local"
        id="eventDate"
        ref={eventDateRef}
        required
      />

      <div>
        <label htmlFor="address">dirección (opcional)</label>
        <MainInput type="text" id="address" ref={addressRef} />

        <label htmlFor="latitude">latitud dirección (opcional)</label>
        <MainInput type="number" id="latitude" ref={latitudeRef} />

        <label htmlFor="longitude">longitud dirección (opcional)</label>
        <MainInput type="number" id="longitude" ref={longitudeRef} />
      </div>

      <label htmlFor="registrationFee">tarifa de inscripción (opcional)</label>
      <MainInput
        type="number"
        id="registrationFee"
        ref={registrationFeeRef}
        min="0"
      />

      <label htmlFor="maxParticipants">número máximo de participantes</label>
      <MainInput
        type="number"
        id="maxParticipants"
        ref={maxParticipantsRef}
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
