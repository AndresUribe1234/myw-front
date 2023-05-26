import { useRef, useState, useContext, useEffect } from "react";
import styles from "../../styles/Login.module.scss";
import MainBtn from "../UI/MainBtn";
import countryPhoneCodes from "@/store/countryPhoneCodes";
import MainInput from "../UI/MainInput";
import ErrorMessage from "../UI/ErrorMessage";
import AuthContext from "@/store/auth-context";
import { frameData } from "framer-motion";

const ProfileForm = (props) => {
  const authCtx = useContext(AuthContext);

  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitingForm, setSubmitingForm] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    setName(authCtx.user.name);
    setSurname(authCtx.user.surname);
    let date;
    let formattedDate;
    if (authCtx.user.dateOfBirth) {
      date = new Date(authCtx.user.dateOfBirth);
      formattedDate = date.toISOString().split("T")[0];
    }
    setDob(formattedDate);
    setPhoneNumber(authCtx.user.phoneNumber);
    setCountryCode(authCtx.user.countryCode);
  }, [authCtx]);

  const updateUserProfile = async function (formData) {
    try {
      const object = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.authObject.token,
        },
        body: JSON.stringify({
          ...formData,
        }),
      };
      setSubmitingForm(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_URL}/api/authentication/account`,
        object
      );

      const data = await response.json();

      if (response.status !== 200) {
        setSubmitingForm(false);
        setErrorMessage(data.err);
        setError(true);
      }

      if (response.status === 200) {
        setSubmitingForm(false);
        setError(false);
        console.log(data);
        authCtx.refreshUserFnx();
        setIsEditable(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      surname,
      dateOfBirth: dob,
      phoneNumber,
      countryCode,
    };

    console.log(formData);
    updateUserProfile(formData);
  };

  const today = new Date().toISOString().split("T")[0];

  if (error) {
    return <ErrorMessage error={errorMessage} />;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.auth_login_container}>
      <label>
        Nombre
        <MainInput
          type="text"
          disabled={!isEditable}
          required
          value={isEditable ? name : authCtx.user.name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Apellido
        <MainInput
          type="text"
          disabled={!isEditable}
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </label>
      <label>
        Fecha de Nacimiento
        <MainInput
          type="date"
          max={today}
          disabled={!isEditable}
          required
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </label>
      <label>
        Número de Teléfono
        <MainInput
          type="number"
          disabled={!isEditable}
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <label>
        Código de País
        <select
          defaultValue={"57"}
          disabled={!isEditable}
          required
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          {countryPhoneCodes.map((phoneCode, index) => (
            <option
              value={phoneCode.code}
              key={index}
            >{`+${phoneCode.code} ${phoneCode.country}`}</option>
          ))}
        </select>
      </label>
      <div className={styles.btn_container_profile}>
        {isEditable && (
          <MainBtn type="submit" disabled={!isEditable}>
            Enviar
          </MainBtn>
        )}
        <MainBtn type="button" onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? "Cancelar" : "Editar"}
        </MainBtn>
      </div>
      {submitingForm && <p>Actualizando perfil del usuario ...</p>}
    </form>
  );
};

export default ProfileForm;
