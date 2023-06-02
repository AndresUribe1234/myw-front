import { useState, useContext, useEffect } from "react";
import styles from "../../../styles/Login.module.scss";
import MainBtn from "@/components/UI/MainBtn";
import MainInput from "@/components/UI/MainInput";
import ErrorMessage from "@/components/UI/ErrorMessage";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Import the dynamic map component
const MapWithNoSSR = dynamic(() => import("../MapComponent"), {
  ssr: false,
});

const EditEventForm = ({ data }) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [registrationFee, setRegistrationFee] = useState("");
  const [currency, setCurrency] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [modalityType, setModalityType] = useState("");
  const [eventType, setEventType] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setTitle(data.title);
    setDescription(data.description);
    setOrganizerName(data.nameOrganizer);

    let eventDate;
    if (data.eventDate) {
      eventDate = new Date(data.eventDate);
      setEventDate(eventDate.toISOString().split("T")[0]);
    }

    setLongitude(data.address?.coordinates[0]);
    setLatitude(data.location?.coordinates[1]);
    setAddress(data.address);
    setRegistrationFee(data.registrationFee);
    setCurrency(data.currency);
    setMaxParticipants(data.maxParticipants);
    setSubscriptionType(data.suscriptionType);
    setModalityType(data.modalityType);
    setEventType(data.eventType);
  }, [data]);

  console.log(eventDate);

  const cancelEditHandler = () => {
    setTitle(data.title);
    setDescription(data.description);
    setOrganizerName(data.nameOrganizer);

    let eventDate;
    if (data.eventDate) {
      eventDate = new Date(data.eventDate);
      setEventDate(eventDate.toISOString().split("T")[0]);
    }
    setLongitude(data.address?.coordinates[0]);
    setLatitude(data.location?.coordinates[1]);
    setAddress(data.address);
    setRegistrationFee(data.registrationFee);
    setCurrency(data.currency);
    setMaxParticipants(data.maxParticipants);
    setSubscriptionType(data.suscriptionType);
    setModalityType(data.modalityType);
    setEventType(data.eventType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      organizerName,
      eventDate,
      longitude,
      latitude,
      address,
      registrationFee,
      currency,
      maxParticipants,
      subscriptionType,
      modalityType,
      eventType,
    };

    console.log(formData);
    // assuming that you have a method in authCtx to update these values
  };

  const today = new Date().toISOString().split("T")[0];

  if (error) {
    return <ErrorMessage error={errorMessage} />;
  }

  const addressHandler = (dataObject) => {
    setLongitude(dataObject.lng);
    setLatitude(dataObject.lat);
    setAddress(dataObject);

    console.log(dataObject);
  };

  console.log(data);

  return (
    <form onSubmit={handleSubmit} className={styles.auth_login_container}>
      <h1>Informacion de tu evento</h1>
      <label>
        Título
        <MainInput
          type="text"
          disabled={!isEditable}
          required
          value={isEditable ? title : data.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Descripción
        <textarea
          type="text"
          disabled={!isEditable}
          required
          value={isEditable ? description : data.description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.beautiful_textarea}
        />
      </label>
      <label>
        Nombre del organizador
        <MainInput
          type="text"
          disabled={!isEditable}
          required
          value={isEditable ? organizerName : data.nameOrganizer}
          onChange={(e) => setOrganizerName(e.target.value)}
        />
      </label>
      <label>
        Tipo de modalidad
        <select
          defaultValue={""}
          disabled={!isEditable}
          required
          value={isEditable ? modalityType : data.modalityType}
          onChange={(e) => setModalityType(e.target.value)}
        >
          <option value="Presencial">Presencial</option>
          <option value="Virtual">Virtual</option>
        </select>
      </label>
      {modalityType === "Presencial" && (
        <div className={styles.address_container}>
          <p>
            Por favor, haz clic en el mapa para cambiar la ubicación de tu
            evento
          </p>
          <MapWithNoSSR
            lat={address?.lat}
            lng={address?.lng}
            onGetAddress={addressHandler}
          />
          <label htmlFor="address">Ubicación del evento</label>
          <p>
            {!address
              ? "No se ha seleccionado ninguna ubicación"
              : address?.address}
          </p>
        </div>
      )}
      <label>
        Tipo de suscripción
        <select
          defaultValue={""}
          disabled={!isEditable}
          required
          value={isEditable ? subscriptionType : data.suscriptionType}
          onChange={(e) => setSubscriptionType(e.target.value)}
        >
          <option value="Gratuita">Gratuita</option>
          <option value="Pagada">Pagada</option>
        </select>
      </label>
      {subscriptionType === "Pagada" && (
        <>
          <label>
            Cuota de registro
            <MainInput
              type="number"
              disabled={!isEditable}
              required
              value={isEditable ? registrationFee : data.registrationFee}
              onChange={(e) => setRegistrationFee(e.target.value)}
            />
          </label>
          <label>
            Moneda
            <MainInput
              type="text"
              disabled={true}
              required
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </label>
        </>
      )}
      <label>
        Tipo de evento
        <select
          defaultValue={""}
          disabled={!isEditable}
          required
          value={isEditable ? eventType : data.eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="Carrera">Carrera</option>
          <option value="Senderismo">Senderismo</option>
          <option value="Ciclismo">Ciclismo</option>
          <option value="Natación">Natación</option>
          <option value="Otro">Otro</option>
        </select>
      </label>
      <label>
        Fecha del evento
        <MainInput
          type="date"
          max={today}
          disabled={!isEditable}
          required
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </label>
      <label>
        Máximo de participantes
        <MainInput
          type="number"
          disabled={!isEditable}
          required
          value={isEditable ? maxParticipants : data.maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value)}
        />
      </label>

      <div className={styles.btn_container_profile}>
        {isEditable && (
          <MainBtn type="submit" disabled={!isEditable}>
            Enviar
          </MainBtn>
        )}
        <MainBtn
          type="button"
          onClick={() => {
            setIsEditable(!isEditable);
            cancelEditHandler();
          }}
        >
          {isEditable ? "Cancelar" : "Editar"}
        </MainBtn>
      </div>
      {submitingForm && <p>Actualizando evento ...</p>}
    </form>
  );
};

export default EditEventForm;
